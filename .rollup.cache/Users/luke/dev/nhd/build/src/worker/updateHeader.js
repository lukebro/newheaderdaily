import { __assign, __awaiter, __generator, __rest } from "tslib";
import Twitter from 'lib/twitter';
import prisma from 'lib/prisma';
import getRandomPhoto from './getRandomPhoto';
import { RATE_LIMIT, DISABLED_TOKEN, IMAGE_ERROR, SUSPENDED_ACCOUNT, error } from '../lib/error';
var PARSE_MSG = 'invalid json response body at https://api.twitter.com/1.1/account/update_profile_banner.json reason: Unexpected end of JSON input';
export default function updateHeader(user) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, token, tokenSecret, image, info, response, e_1, twitter, e_2, first, reset, rateLimit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = user.id, token = user.token, tokenSecret = user.tokenSecret;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getRandomPhoto()];
                case 2:
                    response = _a.sent();
                    (image = response.image, info = __rest(response, ["image"]));
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    throw error(IMAGE_ERROR);
                case 4:
                    try {
                        twitter = new Twitter(token, tokenSecret);
                    }
                    catch (e) { }
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, twitter.post('account/update_profile_banner', {
                            banner: image
                        })];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _a.sent();
                    if (e_2.errors) {
                        first = e_2.errors[0];
                        if (first.code === 88) {
                            reset = new Date(e_2._headers.get('x-rate-limit-reset') * 1000);
                            rateLimit = error(RATE_LIMIT);
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
                    if (e_2.name === 'FetchError' && e_2.type === 'invalid-json' && e_2.message === PARSE_MSG) {
                        throw error(DISABLED_TOKEN);
                    }
                    console.error("Could not update Twitter profile image of user ".concat(userId, "."));
                    throw e_2;
                case 8: return [4 /*yield*/, prisma.header.upsert({
                        where: {
                            userId: userId
                        },
                        update: __assign({}, info),
                        create: __assign({ userId: userId }, info)
                    })];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=updateHeader.js.map