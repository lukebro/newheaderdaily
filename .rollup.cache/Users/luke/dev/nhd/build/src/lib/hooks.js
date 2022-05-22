import { __awaiter, __generator } from "tslib";
import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
export var fetcher = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url)];
            case 1:
                res = _a.sent();
                if (!res.ok) {
                    throw new Error('An error occurred while fetching the data.');
                }
                return [2 /*return*/, res.json()];
        }
    });
}); };
export function useUser(_a) {
    var _b = _a === void 0 ? {} : _a, redirectTo = _b.redirectTo, redirectIfFound = _b.redirectIfFound;
    var _c = useSWR('/api/user'), data = _c.data, error = _c.error, mutate = _c.mutate;
    var loading = !data && !error;
    var loggedOut = error && error.status === 401;
    useEffect(function () {
        if (!redirectTo || loading)
            return;
        if (
        // If redirectTo is set, redirect if the user was not found.
        (redirectTo && !redirectIfFound && loggedOut) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && !loggedOut)) {
            Router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, loading, loggedOut]);
    return { user: data, loggedOut: loggedOut, loading: loading, mutate: mutate };
}
//# sourceMappingURL=hooks.js.map