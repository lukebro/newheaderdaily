import nc from 'next-connect';
import session from 'middleware/session';
import gated from 'middleware/gated';
import updateHeader from '../../../worker/updateHeader';
import Twitter from 'lib/twitter';

const handler = nc();

handler.use(session).use(gated);

handler.get(async (req, res) => {
    const { token, tokenSecret } = req.user;
 
    try {
        await updateHeader(req.user);
    } catch (e) {
        console.log('yes1', e);
        console.log(e.code);
    }

    res.status(200).send('ok');
});

export default handler;
