import { IncomingMessage } from 'http';
import session from 'middleware/session';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import type { User } from '@prisma/client';

type GetServerSidePropsContextAuth = GetServerSidePropsContext & {
    req: IncomingMessage & {
        cookies: NextApiRequestCookies;
        user?: User;
    };
};

export function withSessionSsr<P extends { [key: string]: unknown }>(
    handler: (
        context: GetServerSidePropsContextAuth,
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
    return async function nextGetServerSidePropsHandlerWrappedWithSession(
        context: GetServerSidePropsContext,
    ) {
        await session.run(context.req, context.res);

        return await handler(context);
    };
}
