import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUser } from 'lib/hooks';
import useSWR from 'swr';
import Anchor from 'components/anchor';
import ChangeSetting from 'components/change-setting';
export default function Dashboard() {
    var _a = useUser(), user = _a.user, loading = _a.loading;
    var _b = useSWR('/api/schedule'), schedule = _b.data, error = _b.error;
    var header = useSWR('/api/header').data;
    if (!schedule || loading || !user) {
        return null;
    }
    if (error) {
        return _jsx("p", { children: "something went wrong loading data. reach out to @lukebro" });
    }
    if (!schedule.active) {
        return _jsx(Disabled, {});
    }
    var _c = schedule.timeTillChange, hours = _c.hours, minutes = _c.minutes;
    var processing = schedule.status === 'processing' || (hours === 0 && minutes === 0);
    return (_jsxs("section", { children: [_jsx(ChangeSetting, {}), processing ? (_jsxs("p", { children: ["Your header is processing right now, you should see it", ' ', _jsx(Anchor, __assign({ href: "https://twitter.com/".concat(user.username) }, { children: "updated soon" })), "."] })) : (_jsxs("p", { children: ["Your next header will be updated in", ' ', _jsxs("strong", { children: [hours, " hours"] }), " and", ' ', _jsxs("strong", { children: [minutes, " minutes"] }), "."] })), header && _jsx(CurrentHeader, { header: header })] }));
}
/**
 * Need to give credit to author, Unsplash TOS.
 */
function CurrentHeader(_a) {
    var header = _a.header;
    return (_jsxs("p", { children: ["Your current header image is authored by", ' ', _jsx(Anchor, __assign({ href: header.profileLink }, { children: header.name })), ". You can check out the original ", _jsx(Anchor, __assign({ href: header.original }, { children: "here" })), "."] }));
}
function Disabled() {
    return (_jsxs("section", { children: [_jsx(ChangeSetting, {}), _jsx("p", { children: "Come back here anytime to re-enable your new header daily." })] }));
}
//# sourceMappingURL=dashboard.js.map