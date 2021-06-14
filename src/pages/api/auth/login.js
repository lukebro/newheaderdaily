import nc from 'next-connect';
import session from 'middleware/session';
import passport from 'lib/passport';

const handler = nc();

handler.use(session);

handler.get((req, res, next) => {
    if (req.user) {
        return res.redirect('/', 200);
    }

    next();
}, passport.authenticate('twitter'));

export default handler;
