import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import prisma from 'lib/prisma';
import Twitter from 'lib/twitter';

const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, HOST_URL } = process.env;

const userSelect = {
    id: true,
    twitterId: true,
    username: true,
    name: true,
    avatar: true,
    token: true,
    tokenSecret: true,
    utcOffset: true
};

passport.serializeUser((user, done) => {
    done(null, user.twitterId);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({
        where: { twitterId: id },
        select: userSelect,
    });

    done(null, user);
});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: TWITTER_CONSUMER_KEY,
            consumerSecret: TWITTER_CONSUMER_SECRET,
            callbackURL: `${HOST_URL}/auth/callback`,
        },
        async (token, tokenSecret, profile, done) => {
            const { _json } = profile;
            const {
                id_str: twitterId,
                screen_name: username,
                name,
                profile_image_url_https: avatar,
            } = _json;

            const twitter = new Twitter(token, tokenSecret);

            let utcOffset = 0;
            try {
                const settings = await twitter.get('account/settings');
                utcOffset = settings?.time_zone?.utc_offset || 0;
            } catch (e) {}

            let user = {
                twitterId,
                username,
                name,
                avatar,
                token,
                tokenSecret,
                utcOffset
            };

            let query = await prisma.user.findUnique({
                where: {
                    twitterId: user.twitterId,
                },
                select: userSelect,
            });

            if (!query) {
                user.schedule = {
                    create: { changeOn: new Date() },
                };

                user = await prisma.user.create({
                    data: user,
                });
            } else {
                user = await prisma.user.update({
                    where: {
                        twitterId: user.twitterId,
                    },
                    data: user,
                });
            }

            done(null, user);
        }
    )
);

export default passport;
