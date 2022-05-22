import Layout from 'components/layout';
import Dashboard from 'components/dashboard';
import { useUser } from 'lib/hooks';
import { getHeader, getSchedule } from 'lib/db';
import { withSessionSsr } from 'lib/ssr';
import { getUserFromReq } from 'lib/user';
import { SWRConfig } from 'swr';

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    let user = null;
    let header = null;
    let schedule = null;

    if (req.user) {
        user = getUserFromReq(req);

        [header, schedule] = await Promise.all([
            getHeader(req.user.id),
            getSchedule(req.user.id),
        ]);
    }

    return {
        props: {
            fallback: {
                '/api/user': user,
                '/api/schedule': schedule,
                '/api/header': header,
            },
        },
    };
});

function Index({ fallback }: { fallback?: object }) {
    return (
        <SWRConfig value={{ fallback }}>
            <Page />
        </SWRConfig>
    );
}

function Page() {
    const { loggedOut } = useUser();

    return <Layout>{loggedOut ? <HomePage /> : <Dashboard />}</Layout>;
}

function HomePage() {
    return (
        <article className="prose prose-stone">
            <h1>A new header photo daily.</h1>

            <p>
                Everyday your <a href="https://twitter.com">Twitter</a> header
                photo will be changed to a curated one from{' '}
                <a href="https://unsplash.com">Unsplash</a>.
            </p>
            <h3>how does it work?</h3>
            <p>
                Every morning we&apos;ll randomly select a curated photo from
                Unsplash and upload it as your Twitter profile banner. All your
                followers will think you work really hard to keep your banner
                fresh &amp; unique.
            </p>
            <h3>how do i turn it off?</h3>
            <p>
                You can unsubscribe from this service anytime by either revoking
                access to your Twitter via this{' '}
                <a href="https://twitter.com/settings/connected_apps">
                    settings page
                </a>
                , or you can sign in and hit the big red &quot;stop&quot;
                button.
            </p>
        </article>
    );
}

export default Index;
