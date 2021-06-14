import { SWRConfig } from 'swr';
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import { fetcher } from 'lib/hooks';
import 'tailwindcss/tailwind.css';
import '../global.css';

fontAwesomeConfig.autoAddCss = false;

const config = {
    fetcher,
    onErrorRetry: (error) => {
        if (error.status === 401 || error.status === 403) {
            return;
        }
    },
};

export default function App({ Component, pageProps }) {
    return (
        <SWRConfig value={config}>
            <Component {...pageProps} />
        </SWRConfig>
    );
}
