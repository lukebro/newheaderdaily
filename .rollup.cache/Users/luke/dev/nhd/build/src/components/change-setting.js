import { __assign, __awaiter, __generator } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import useSWR from 'swr';
import { requestUpdateSchedule } from 'lib/requests';
var contents = {
    active: {
        style: 'bg-red-500',
        text: 'Click me to disable changing your header',
    },
    disabled: {
        style: 'bg-green-500',
        text: 'Click me to enable changing your header',
    },
};
var styles = 'mb-5 text-white p-3 rounded-sm font-sans text-sm hover:transform hover:scale-105 transition-transform';
function ChangeSetting() {
    var _this = this;
    var _a = useSWR('/api/schedule'), data = _a.data, error = _a.error, mutate = _a.mutate;
    if (!data || error) {
        return null;
    }
    var content = contents[data.active ? 'active' : 'disabled'];
    return (_jsx("div", { children: _jsx("button", __assign({ className: "".concat(styles, " ").concat(content.style), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                var active;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            active = !data.active;
                            mutate(__assign(__assign({}, data), { timeTillChange: __assign({}, data.timeTillChange), active: active }), false);
                            return [4 /*yield*/, requestUpdateSchedule(active)];
                        case 1:
                            _a.sent();
                            mutate();
                            return [2 /*return*/];
                    }
                });
            }); } }, { children: content.text })) }));
}
export default ChangeSetting;
//# sourceMappingURL=change-setting.js.map