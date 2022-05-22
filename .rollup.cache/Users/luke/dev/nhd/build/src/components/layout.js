import { __assign } from "tslib";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import Head from 'next/head';
import Nav from './nav';
import Footer from './footer';
function Layout(_a) {
    var title = _a.title, children = _a.children;
    return (_jsxs("div", __assign({ className: "relative min-h-screen" }, { children: [_jsx(Head, { children: _jsxs("title", { children: [title ? "".concat(title, " - ") : '', "newheaderdaily"] }) }), _jsx(Nav, {}), _jsx("div", __assign({ className: "max-w-screen-lg mx-auto lg:px-0 px-10 pt-24 pb-16" }, { children: children })), _jsx(Footer, {})] })));
}
export default Layout;
//# sourceMappingURL=layout.js.map