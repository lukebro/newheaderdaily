import { __awaiter, __generator } from "tslib";
import './setup';
import schedule from 'node-schedule';
import Sentry from 'lib/sentry';
import processSchedule from './jobs/process-schedule';
var processing = false;
/**
 * Every 10 seconds we'll run this job unless busy.
 */
schedule.scheduleJob('* * * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (processing) {
                    // skip scheduling another task when one is running
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                processing = true;
                console.log('Starting job.');
                return [4 /*yield*/, processSchedule()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                Sentry.captureException(e_1);
                return [3 /*break*/, 4];
            case 4:
                processing = false;
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map