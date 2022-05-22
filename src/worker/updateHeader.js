import Twitter from 'lib/twitter';
import prisma from 'lib/prisma';
import getRandomPhoto from './getRandomPhoto';
import {
    RATE_LIMIT,
    DISABLED_TOKEN,
    IMAGE_ERROR,
    SUSPENDED_ACCOUNT,
    error
} from '../lib/error';

const PARSE_MSG = 'invalid json response body at https://api.twitter.com/1.1/account/update_profile_banner.json reason: Unexpected end of JSON input';

export default async function updateHeader(user) {
    const { id: userId, token, tokenSecret } = user;

    // image is base64
    let image, info;

    try {
        const response = await getRandomPhoto();

        ({ image, ...info } = response);
    } catch (e) {
        throw error(IMAGE_ERROR);
    }

    let twitter;

    try {
        twitter = new Twitter(token, tokenSecret);
    } catch (e) {}

    try {
        await twitter.post('account/update_profile_banner', {
            banner: image
        });
    } catch (e) {
        if (e.errors) {
            const [first] = e.errors;

            if (first.code === 88) {
                const reset = new Date(
                    e._headers.get('x-rate-limit-reset') * 1000
                );

                const rateLimit = error(RATE_LIMIT);
                rateLimit.nextReset = reset;

                throw rateLimit;
            }

            if (first.code === 89) {
                throw error(DISABLED_TOKEN);
            }

            if (first.code === 64) {
                throw error(SUSPENDED_ACCOUNT);
            }
        }

        // @TODO(lukebro): twitter-lite just doesn't handle
        // whatever response when app permissions are revoked
        // and an update_profile_banner request is made...
        // for now... we'll just pretend all fetch errors (error parsing json)
        // will be when token is disabled.
        if (e.name === 'FetchError' && e.type === 'invalid-json' && e.message === PARSE_MSG) {
            throw error(DISABLED_TOKEN);
        }

        console.error(
            `Could not update Twitter profile image of user ${userId}.`
        );

        throw e;
    }

    await prisma.header.upsert({
        where: {
            userId
        },
        update: {
            ...info
        },
        create: {
            userId,
            ...info
        }
    });
}
