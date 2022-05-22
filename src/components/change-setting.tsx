import useSWR from 'swr';
import { requestUpdateSchedule } from 'lib/requests';
import type { Schedule } from 'src/types';

const contents = {
    active: {
        style: 'bg-red-500',
        text: 'Click me to disable changing your header',
    },
    disabled: {
        style: 'bg-green-500',
        text: 'Click me to enable changing your header',
    },
};

const styles =
    'mb-5 text-white p-3 rounded-sm font-sans text-sm hover:transform hover:scale-105 transition-transform';

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
