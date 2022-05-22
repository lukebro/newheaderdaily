import nc from 'next-connect';
import session from 'middleware/session';
import gated from 'middleware/gated';
import prisma from 'lib/prisma';
import { timeAt3am } from 'lib/time';
import { getSchedule } from 'lib/db';

const handler = nc();

handler.use(session).use(gated);

handler.get(async (req, res) => {
    const { id } = req.user;

    const schedule = await getSchedule(id);

    if (!schedule) {
        return res.status(404);
    }

    res.status(200).json(schedule);
});

handler.patch(async (req, res) => {
    const { id, utcOffset } = req.user;
    const body = req.body || {};
    const active = !!body.active;

    const schedule = await prisma.schedule.update({
        where: {
            userId: id,
        },
        data: {
            active,
            changeOn: active ? timeAt3am(utcOffset) : undefined,
        },
    });

    res.status(schedule ? 200 : 500).json({ ok: schedule ? 1 : 0 });
});

export default handler;
