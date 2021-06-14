import nc from 'next-connect';
import session from 'middleware/session';
import gated from 'middleware/gated';

const handler = nc();

handler.use(session).use(gated);

handler.get((req, res) => {
    const { twitterId, id, token, tokenSecret, ...user } = req.user;

    res.status(200).json(user);
});

export default handler;
