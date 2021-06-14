import Layout from 'components/layout';
import Dashboard from 'components/dashboard';
import { useUser } from 'lib/hooks';

function Index() {
    const { loading, loggedOut } = useUser();

    if (loading) {
        return null;
    }

    return <Layout>{loggedOut ? <HomePage /> : <Dashboard />}</Layout>;
}

function HomePage() {
    return (
        <article className="prose prose-indigo">
            <h1>A new header photo daily.</h1>

            <p>
                Everyday your <a href="https://twitter.com">Twitter</a> header
                photo will be changed to a random one from{' '}
                <a href="https://unsplash.com">Unsplash</a>.
            </p>
            <h3>how does it work?</h3>
            <p>
                Every morning a bot will randomly select a curated picture from
                Unsplash and upload it as your Twitter profile banner making all
                your friends think you work really hard to keep your banner
                fresh & unique.
            </p>
            <h3>how do i turn it off?</h3>
            <p>
                You can unsubscribe from this service anytime by either revoking
                access to your Twitter via this{' '}
                <a href="https://twitter.com/settings/connected_apps">
                    settings page
                </a>
                , or you can sign in and hit the big red "stop" button.
            </p>
        </article>
    );
}

export default Index;
