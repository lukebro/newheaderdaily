import nc from 'next-connect';
import session from 'middleware/session';
import gated from 'middleware/gated';
import prisma from 'lib/prisma';
import { timeAt3am } from 'lib/time';
import { differenceInHours, differenceInMinutes } from 'date-fns';

const handler = nc();

handler.use(session).use(gated);

handler.get(async (req, res) => {
    const { id } = req.user;

    const schedule = await prisma.schedule.findUnique({
        where: {
            userId: id
        },
        select: {
            frequency: true,
            changeOn: true,
            status: true,
            active: true
        }
    });

    const now = new Date();

    const hours = differenceInHours(schedule.changeOn, now);
    const minutes = differenceInMinutes(schedule.changeOn, now) - hours * 60;
    const timeTillChange = {
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes)
    };

    res.status(200).json({ ...schedule, timeTillChange });
});

handler.patch(async (req, res) => {
    const { id, utcOffset } = req.user;
    const body = req.body || {};
    const active = !!body.active;

    const schedule = await prisma.schedule.update({
        where: {
            userId: id
        },
        data: {
            active,
            changeOn: active ? timeAt3am(utcOffset) : undefined
        }
    });

    res.status(schedule ? 200 : 500).json({ ok: schedule ? 1 : 0 });
});

export default handler;
