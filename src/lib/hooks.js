import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
};

export function useUser({ redirectTo, redirectIfFound } = {}) {
    const { data, error, mutate } = useSWR('/api/user');
    const loading = !data && !error;
    const loggedOut = error && error.status === 401;

    useEffect(() => {
        if (!redirectTo || loading) return;
        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && loggedOut) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && !loggedOut)
        ) {
            Router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, loading, loggedOut]);

    return { user: data, loggedOut, loading, mutate };
}
