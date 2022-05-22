import nc from 'next-connect';
import session from 'middleware/session';
import gated from 'middleware/gated';
import { getHeader } from 'lib/db';

const handler = nc();

handler.use(session).use(gated);

handler.get(async (req, res) => {
    const { id } = req.user;

    const header = await getHeader(id);

    if (!header) {
        return res.status(404).json({ error: true });
    }

    res.status(200).json(header);
});

export default handler;
