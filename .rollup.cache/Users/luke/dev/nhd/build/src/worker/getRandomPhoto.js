import { __awaiter, __generator } from "tslib";
import unsplash from 'lib/unsplash';
import querystring from 'querystring';
export default (function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, response, errors, photo, link, banner, imgBuffer, user, links, name, profile_image, profile_links, profileImage, profileLink, original, image;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, unsplash.photos.getRandom({
                    collectionIds: ['1065396', '1339119', '1339276', '1065376'],
                    count: 1
                })];
            case 1:
                _a = _b.sent(), response = _a.response, errors = _a.errors;
                if (errors) {
                    throw new Error('Could not fetch an image');
                }
                photo = response[0];
                link = photo.urls.raw +
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
                return [4 /*yield*/, fetch(link)];
            case 2:
                banner = _b.sent();
                return [4 /*yield*/, banner.buffer()];
            case 3:
                imgBuffer = _b.sent();
                user = photo.user, links = photo.links;
                name = user.name, profile_image = user.profile_image, profile_links = user.links;
                profileImage = profile_image.medium;
                profileLink = profile_links.html;
                original = links.html;
                image = imgBuffer.toString('base64');
                return [4 /*yield*/, unsplash.photos.trackDownload({
                        downloadLocation: links.download_location
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, { name: name, profileImage: profileImage, profileLink: profileLink, original: original, image: image }];
        }
    });
}); });
//# sourceMappingURL=getRandomPhoto.js.map