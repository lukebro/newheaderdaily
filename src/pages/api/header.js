import nc from 'next-connect';
import session from 'middleware/session';
import gated from 'middleware/gated';
import prisma from 'lib/prisma';
import { differenceInHours, differenceInMinutes } from 'date-fns';

const handler = nc();

handler.use(session).use(gated);

handler.get(async (req, res) => {
    const { id } = req.user;

    const header = await prisma.header.findUnique({
        where: {
            userId: id
        },
    });

    const { name, profileImage, profileLink, original } = header;

    res.status(header ? 200 : 404).json({ name, profileImage, profileLink, original });
});

export default handler;
