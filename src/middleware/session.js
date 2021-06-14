import nextConnect from 'next-connect';
import passport from '../lib/passport';
import session from 'cookie-session';

const auth = nextConnect()
    .use(
        session({
            name: 'session',
            secret: process.env.TOKEN_SECRET,
            cookie: {
                maxAge: 60 * 60 * 8, // 8 hours,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
                overwrite: true
            },
        })
    )
    .use(passport.initialize())
    .use(passport.session());

export default auth;
