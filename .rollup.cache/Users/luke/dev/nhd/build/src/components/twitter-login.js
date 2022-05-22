import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from 'components/icon';
import Link from 'next/link';
function TwitterLogin(props) {
    return (_jsx(Link, __assign({}, props, { children: _jsxs("a", __assign({ className: "block twitter text-white p-3 rounded-sm font-sans text-sm hover:transform hover:scale-105 transition-transform" }, { children: [_jsx(Icon, { icon: ['fab', 'twitter'] }), " Sign in with Twitter"] })) })));
}
export default TwitterLogin;
//# sourceMappingURL=twitter-login.js.map