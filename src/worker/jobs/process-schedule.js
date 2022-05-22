import prisma from '../../lib/prisma.js';
import updateHeader from '../updateHeader.js';
import { addMinutes, isFuture } from 'date-fns';
import Sentry from '../../lib/sentry.js';
import { format, timeAt3am } from '../../lib/time.js';
import {
    SUSPENDED_ACCOUNT,
    RATE_LIMIT,
    DISABLED_TOKEN,
    IMAGE_ERROR,
} from '../../lib/error.js';

export default async () => {
    const now = new Date();

    console.log(`Current time is ${format(now)}.`);

    const jobs = await prisma.schedule.findMany({
        where: {
            active: true,
            status: 'scheduled',
            changeOn: {
                lte: now,
            },
        },
        include: {
            user: true,
        },
    });


    if (jobs.length === 0) {
        console.log('No jobs to process.');
        return;
    }

    console.log('Jobs found: ', jobs.length);

    const updated = await prisma.schedule.updateMany({
        data: {
            status: 'processing',
        },
        where: {
            active: true,
            status: 'scheduled',
            changeOn: {
                lte: now,
            },
        },
    });

    if (updated.count !== jobs.length) {
        // This maybe can happen? Very tough race condition but
        // in a world where the findMany tasks is slower than 10s (job cycle).
        Sentry.captureMessage(
            'Well.. the updated count and the jobs length count did not match up.'
        );
    }

    let completed = 0;

    const queue = jobs.reduce(async (previous, job) => {
        await previous;

        const transaction = Sentry.startTransaction({
            op: 'worker',
            name: 'processHeader',
        });

        Sentry.setUser({
            id: job.userId,
            username: job.user.username,
            twitterId: job.user.twitterId,
            name: job.user.name,
        });
        Sentry.setContext({
            utcOffset: job.user.utcOffset,
            changeOn: job.changeOn
        });

        let changeOn = timeAt3am(job.user.utcOffset);
        let active = undefined;
        let failed = false;

        try {
            await updateHeader(job.user);
        } catch (e) {
            // if we hit rate limit, we try again at next reset
            if (e.code === RATE_LIMIT) {
                changeOn = addMinutes(new Date(e.nextReset), 5);
            } else if (
                e.code === DISABLED_TOKEN ||
                e.code === SUSPENDED_ACCOUNT
            ) {
                active = false;
            } else if (e.code === IMAGE_ERROR) {
                // if unsplash is down try again in 30
                changeOn = addMinutes(new Date(), 30);
            } else {
                // try again in 15 minutes
                changeOn = addMinutes(new Date(), 15);
            }

            console.log(JSON.stringify({ changeOn, active }, null, 4));

            console.error(e);
            Sentry.captureException(e);
            failed = true;
        }

        if (!isFuture(changeOn)) {
            Sentry.captureMessage(`Change on was not in the future: ${job.user.utcOffset} of user ${job.userId}`);
            changeOn = timeAt3am(0);
        }

        const data = {
            status: 'scheduled',
            changeOn,
            active
        };

        if (!failed) {
            console.log(`Changing next header on ${format(changeOn)} for user ${job.userId}.`);

            data.count = {
                increment: 1
            };
        }

        await prisma.schedule.update({
            where: {
                userId: job.userId,
            },
            data
        });

        if (!failed) completed += 1;

        transaction.finish();
    }, Promise.resolve());

    // wait for the queue chain to finish
    await queue;

    console.log(`Completed ${completed}/${jobs.length} jobs.`);
};
