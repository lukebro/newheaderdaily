import { useUser } from 'lib/hooks';
import useSWR from 'swr';
import Anchor from 'components/anchor';
import ChangeSetting from 'components/change-setting';

export default function Dashboard() {
    const { user, loading } = useUser();
    const { data: schedule, error } = useSWR('/api/schedule');
    const { data: header } = useSWR('/api/header');

    if (!schedule || loading) {
        return null;
    }

    if (error) {
        return <p>something went wrong loading data. reach out to @lukebro</p>;
    }

    if (!schedule.active) {
        return <Disabled />;
    }

    const { hours, minutes } = schedule.timeTillChange;
    const processing =
        schedule.status === 'processing' || (hours === 0 && minutes === 0);

    return (
        <section>
            <ChangeSetting />

            {processing ? (
                <p>
                    Your header is processing right now, you should see it{' '}
                    <Anchor href={`https://twitter.com/${user.username}`}>
                        updated soon
                    </Anchor>
                    .
                </p>
            ) : (
                <p>
                    Your next header will be updated in{' '}
                    <strong>{hours} hours</strong> and{' '}
                    <strong>{minutes} minutes</strong>.
                </p>
            )}

            {header && <CurrentHeader header={header} />}
        </section>
    );
}

/**
 * Need to give credit to author, Unsplash TOS.
 */
function CurrentHeader({ header }) {
    return (
        <p>
            Your current header image is authored by{' '}
            <Anchor href={header.profileLink}>{header.name}</Anchor>. You can
            check out the original <Anchor href={header.original}>here</Anchor>.
        </p>
    );
}

function Disabled() {
    return (
        <section>
            <ChangeSetting />

            <p>Come back here anytime to re-enable your new header daily.</p>
        </section>
    );
}
