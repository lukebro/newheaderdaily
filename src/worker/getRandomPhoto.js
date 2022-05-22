import unsplash from 'lib/unsplash';
import querystring from 'querystring';

export default async () => {
    const { response, errors } = await unsplash.photos.getRandom({
        collectionIds: ['1065396', '1339119', '1339276', '1065376'],
        count: 1
    });

    if (errors) {
        throw new Error('Could not fetch an image');
    }

    const [photo] = response;

    let link =
        photo.urls.raw +
        '?' +
        querystring.stringify({
            dpr: 1.5,
            auto: 'enhance',
            fit: 'crop',
            crop: 'entropy',
            w: 1500,
            h: 500,
            q: 100,
            fm: 'jpg'
        });

    const banner = await fetch(link);

    const imgBuffer = await banner.buffer();

    const { user, links } = photo;
    const { name, profile_image, links: profile_links } = user;

    const profileImage = profile_image.medium;
    const profileLink = profile_links.html;
    const original = links.html;
    const image = imgBuffer.toString('base64');

    await unsplash.photos.trackDownload({
        downloadLocation: links.download_location
    });

    return { name, profileImage, profileLink, original, image };
};
