import { __awaiter, __generator } from "tslib";
var headers = {
    'Content-Type': 'application/json',
    accept: 'application/json'
};
export function requestUpdateSchedule(active) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/api/schedule', {
                        headers: headers,
                        method: 'PATCH',
                        body: JSON.stringify({ active: !!active })
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=requests.js.map