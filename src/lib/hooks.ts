import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import type { User } from 'types';

class FetchError extends Error {
    public status?: number;
}

export const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new FetchError(
            'An error occurred while fetching the data.',
        );
        error.status = res.status;

        throw error;
    }

    return res.json();
};

export function useUser({
    redirectTo,
    redirectIfFound,
    fallbackData,
}: {
    redirectTo?: string;
    redirectIfFound?: boolean;
    fallbackData?: User;
} = {}) {
    const { data, error, mutate } = useSWR<User>('/api/user', fetcher, {
        fallbackData,
    });

    const loggedOut = !data;

    useEffect(() => {
        if (!redirectTo) return;
        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && loggedOut) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && !loggedOut)
        ) {
            Router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, loggedOut]);

    return { user: data, loggedOut, mutate };
}
