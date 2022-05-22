import useSWR from 'swr';
import { requestUpdateSchedule } from 'lib/requests';
import type { Schedule } from 'types';

const contents = {
    active: {
        style: 'bg-red-500',
        text: 'Click me to disable changing your header.',
    },
    disabled: {
        style: 'bg-green-500',
        text: 'Click me to enable changing your header.',
    },
};

const styles =
    'text-white p-3 rounded-sm hover:transform hover:scale-105 transition-transform drop-shadow-md hover:drop-shadow-lg ';

function ChangeSetting(): JSX.Element | null {
    const { data, error, mutate } = useSWR<Schedule>('/api/schedule');

    if (!data || error) {
        return null;
    }

    const content = contents[data.active ? 'active' : 'disabled'];

    return (
        <div>
            <button
                className={`${styles} ${content.style}`}
                onClick={async () => {
                    const active = !data.active;
                    mutate(
                        {
                            ...data,
                            timeTillChange: { ...data.timeTillChange },
                            active,
                        },
                        false,
                    );

                    await requestUpdateSchedule(active);

                    mutate();
                }}
            >
                {content.text}
            </button>
        </div>
    );
}

export default ChangeSetting;
