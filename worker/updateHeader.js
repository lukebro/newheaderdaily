import Twitter from '../src/lib/twitter';
import prisma from '../src/lib/prisma';
import getRandomPhoto from './getRandomPhoto';
import {
    RATE_LIMIT,
    DISABLED_TOKEN,
    IMAGE_ERROR,
    error
} from '../src/lib/error';

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
                console.log('Disabled token.');

                throw error(DISABLED_TOKEN);
            }
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
