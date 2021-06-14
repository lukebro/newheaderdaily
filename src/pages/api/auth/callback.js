import nc from 'next-connect';
import session from 'middleware/session';
import passport from 'lib/passport';

const handler = nc();

handler
    .use(session)
    .get(
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/',
        })
    );

export default handler;
