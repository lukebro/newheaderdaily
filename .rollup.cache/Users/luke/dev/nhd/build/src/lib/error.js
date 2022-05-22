var _a;
import { __extends } from "tslib";
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.name = 'CustomError';
        _this.code = code;
        return _this;
    }
    return CustomError;
}(Error));
export { CustomError };
export function error(code) {
    if (code === void 0) { code = 0; }
    var message = MESSAGES[code] || MESSAGES[0];
    return new CustomError(message, code);
}
export var RATE_LIMIT = 1;
export var DISABLED_TOKEN = 2;
export var IMAGE_ERROR = 3;
export var SUSPENDED_ACCOUNT = 4;
export var INTERNAL_ERROR = 5;
export var MESSAGES = (_a = {
        0: 'Unknown error'
    },
    _a[RATE_LIMIT] = 'Hit the rate limit of API',
    _a[DISABLED_TOKEN] = 'Disabled token',
    _a[IMAGE_ERROR] = 'Could not fetch an image',
    _a[SUSPENDED_ACCOUNT] = 'Suspended account',
    _a[INTERNAL_ERROR] = 'Internal error',
    _a);
//# sourceMappingURL=error.js.map