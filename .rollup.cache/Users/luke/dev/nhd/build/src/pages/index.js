import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from 'components/layout';
import Dashboard from 'components/dashboard';
import { useUser } from 'lib/hooks';
function Index() {
    var _a = useUser(), loading = _a.loading, loggedOut = _a.loggedOut;
    if (loading) {
        return null;
    }
    return _jsx(Layout, { children: loggedOut ? _jsx(HomePage, {}) : _jsx(Dashboard, {}) });
}
function HomePage() {
    return (_jsxs("article", __assign({ className: "prose prose-indigo" }, { children: [_jsx("h1", { children: "A new header photo daily." }), _jsxs("p", { children: ["Everyday your ", _jsx("a", __assign({ href: "https://twitter.com" }, { children: "Twitter" })), " header photo will be changed to a random one from", ' ', _jsx("a", __assign({ href: "https://unsplash.com" }, { children: "Unsplash" })), "."] }), _jsx("h3", { children: "how does it work?" }), _jsx("p", { children: "Every morning a bot will randomly select a curated picture from Unsplash and upload it as your Twitter profile banner making all your friends think you work really hard to keep your banner fresh & unique." }), _jsx("h3", { children: "how do i turn it off?" }), _jsxs("p", { children: ["You can unsubscribe from this service anytime by either revoking access to your Twitter via this", ' ', _jsx("a", __assign({ href: "https://twitter.com/settings/connected_apps" }, { children: "settings page" })), ", or you can sign in and hit the big red \"stop\" button."] })] })));
}
export default Index;
//# sourceMappingURL=index.js.map