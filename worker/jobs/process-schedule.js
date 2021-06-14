import prisma from '../../src/lib/prisma.js';
import updateHeader from '../updateHeader.js';
import { addMinutes } from 'date-fns';
import Sentry from '../../src/lib/sentry.js';
import { timeAt3am } from '../../src/lib/time.js';
import {
    SUSPENDED_ACCOUNT,
    RATE_LIMIT,
    DISABLED_TOKEN,
    IMAGE_ERROR
} from '../../src/lib/error.js';

export default async () => {
    const jobs = await prisma.schedule.findMany({
        where: {
            active: true,
            status: 'scheduled',
            changeOn: {
                lte: new Date()
            }
        },
        include: {
            user: true
        }
    });

    if (!jobs || jobs.length === 0) {
        return;
    }

    const transaction = Sentry.startTransaction({
        op: 'worker',
        name: 'scheduleAllHeaders'
    });

    const queue = jobs.map(async (job) => {
        const transaction = Sentry.startTransaction({
            op: 'worker',
            name: 'processHeader'
        });

        await prisma.schedule.update({
            where: {
                userId: job.userId
            },
            data: {
                status: 'processing'
            }
        });

        let changeOn = timeAt3am(job.user.utcOffset);
        let active = undefined;

        try {
            await updateHeader(job.user);
        } catch (e) {
            // if we hit rate limit, we try again at next reset
            if (e.code === RATE_LIMIT) {
                changeOn = e.nextReset;
            } else if (e.code === DISABLED_TOKEN || e.code === SUSPENDED_ACCOUNT) {
                active = false;
            } else if (e.code === IMAGE_ERROR) {
                // if unsplash is down try again in 30
                changeOn = addMinutes(new Date(), 30);
            } else {
                // try again in 15 minutes
                changeOn = addMinutes(new Date(), 15);
            }

            console.error(e);
            Sentry.captureException(e);
        }

        await prisma.schedule.update({
            where: {
                userId: job.userId
            },
            data: {
                status: 'scheduled',
                changeOn,
                active
            }
        });

        transaction.finish();
    });

    await Promise.all(queue);

    transaction.finish();
};
