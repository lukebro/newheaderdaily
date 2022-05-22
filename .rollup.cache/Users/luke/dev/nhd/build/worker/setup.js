import { __awaiter, __generator } from "tslib";
import './env';
import fetch from 'node-fetch';
import Sentry from '../src/lib/sentry';
global.fetch = fetch;
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}
process.on('SIGINT', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // drain
            return [4 /*yield*/, Sentry.close(2000)];
            case 1:
                // drain
                _a.sent();
                process.exit();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=setup.js.map