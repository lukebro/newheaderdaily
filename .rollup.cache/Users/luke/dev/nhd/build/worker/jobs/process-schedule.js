import { __awaiter, __generator } from "tslib";
import prisma from '../../src/lib/prisma.js';
import updateHeader from '../updateHeader.js';
import { addMinutes, isFuture } from 'date-fns';
import Sentry from '../../src/lib/sentry.js';
import { format, timeAt3am } from '../../src/lib/time.js';
import { SUSPENDED_ACCOUNT, RATE_LIMIT, DISABLED_TOKEN, IMAGE_ERROR, } from '../../src/lib/error.js';
export default (function () { return __awaiter(void 0, void 0, void 0, function () {
    var now, jobs, updated, completed, queue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = new Date();
                console.log("Current time is ".concat(format(now), "."));
                return [4 /*yield*/, prisma.schedule.findMany({
                        where: {
                            active: true,
                            status: 'scheduled',
                            changeOn: {
                                lte: now,
                            },
                        },
                        include: {
                            user: true,
                        },
                    })];
            case 1:
                jobs = _a.sent();
                if (jobs.length === 0) {
                    console.log('No jobs to process.');
                    return [2 /*return*/];
                }
                console.log('Jobs found: ', jobs.length);
                return [4 /*yield*/, prisma.schedule.updateMany({
                        data: {
                            status: 'processing',
                        },
                        where: {
                            active: true,
                            status: 'scheduled',
                            changeOn: {
                                lte: now,
                            },
                        },
                    })];
            case 2:
                updated = _a.sent();
                if (updated.count !== jobs.length) {
                    // This maybe can happen? Very tough race condition but
                    // in a world where the findMany tasks is slower than 10s (job cycle).
                    Sentry.captureMessage('Well.. the updated count and the jobs length count did not match up.');
                }
                completed = 0;
                queue = jobs.reduce(function (previous, job) { return __awaiter(void 0, void 0, void 0, function () {
                    var transaction, changeOn, active, failed, e_1, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, previous];
                            case 1:
                                _a.sent();
                                transaction = Sentry.startTransaction({
                                    op: 'worker',
                                    name: 'processHeader',
                                });
                                Sentry.setUser({
                                    id: job.userId,
                                    username: job.user.username,
                                    twitterId: job.user.twitterId,
                                    name: job.user.name,
                                });
                                Sentry.setContext({
                                    utcOffset: job.user.utcOffset,
                                    changeOn: job.changeOn
                                });
                                changeOn = timeAt3am(job.user.utcOffset);
                                active = undefined;
                                failed = false;
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, updateHeader(job.user)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                // if we hit rate limit, we try again at next reset
                                if (e_1.code === RATE_LIMIT) {
                                    changeOn = addMinutes(new Date(e_1.nextReset), 5);
                                }
                                else if (e_1.code === DISABLED_TOKEN ||
                                    e_1.code === SUSPENDED_ACCOUNT) {
                                    active = false;
                                }
                                else if (e_1.code === IMAGE_ERROR) {
                                    // if unsplash is down try again in 30
                                    changeOn = addMinutes(new Date(), 30);
                                }
                                else {
                                    // try again in 15 minutes
                                    changeOn = addMinutes(new Date(), 15);
                                }
                                console.log(JSON.stringify({ changeOn: changeOn, active: active }, null, 4));
                                console.error(e_1);
                                Sentry.captureException(e_1);
                                failed = true;
                                return [3 /*break*/, 5];
                            case 5:
                                if (!isFuture(changeOn)) {
                                    Sentry.captureMessage("Change on was not in the future: ".concat(job.user.utcOffset, " of user ").concat(job.userId));
                                    changeOn = timeAt3am(0);
                                }
                                data = {
                                    status: 'scheduled',
                                    changeOn: changeOn,
                                    active: active
                                };
                                if (!failed) {
                                    console.log("Changing next header on ".concat(format(changeOn), " for user ").concat(job.userId, "."));
                                    data.count = {
                                        increment: 1
                                    };
                                }
                                return [4 /*yield*/, prisma.schedule.update({
                                        where: {
                                            userId: job.userId,
                                        },
                                        data: data
                                    })];
                            case 6:
                                _a.sent();
                                if (!failed)
                                    completed += 1;
                                transaction.finish();
                                return [2 /*return*/];
                        }
                    });
                }); }, Promise.resolve());
                // wait for the queue chain to finish
                return [4 /*yield*/, queue];
            case 3:
                // wait for the queue chain to finish
                _a.sent();
                console.log("Completed ".concat(completed, "/").concat(jobs.length, " jobs."));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=process-schedule.js.map