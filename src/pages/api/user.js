import nc from 'next-connect';
import session from 'middleware/session';
import gated from 'middleware/gated';
import { getUserFromReq } from 'lib/user';

const handler = nc();

handler.use(session).use(gated);

handler.get((req, res) => {
    const user = getUserFromReq(req);

    if (!user) {
        return res.status(500).send('Something went wrong');
    }

    res.status(200).json(user);
});

export default handler;
