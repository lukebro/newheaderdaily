import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import Anchor from 'components/anchor';
import TwitterLogin from 'components/twitter-login';
import { useUser } from 'lib/hooks';
function Nav() {
    var _a = useUser(), user = _a.user, loading = _a.loading;
    return (_jsx("header", __assign({ className: "fixed bg-white top-0 inset-x-0 w-full py-5" }, { children: _jsxs("div", __assign({ className: "max-w-screen-lg mx-auto lg:px-0 px-10 flex sm:items-center justify-between flex-col sm:flex-row h-full" }, { children: [_jsx("div", { children: _jsx(Link, __assign({ href: "/" }, { children: _jsxs("a", __assign({ className: "font-bold" }, { children: [_jsx("span", __assign({ className: "mr-3" }, { children: "\uD83D\uDDBC" })), _jsx("span", { children: "newheaderdaily" })] })) })) }), !loading && (_jsx("div", { children: user ? (_jsx(UserBar, { user: user })) : (_jsx(TwitterLogin, { href: "/login" })) }))] })) })));
}
function UserBar(_a) {
    var user = _a.user;
    return (_jsxs("div", { children: [_jsxs("span", __assign({ className: "mr-3" }, { children: ["Welcome ", user.name, "!"] })), _jsx(Link, __assign({ href: "/logout" }, { children: _jsx(Anchor, { children: "Logout" }) }))] }));
}
export default Nav;
//# sourceMappingURL=nav.js.map