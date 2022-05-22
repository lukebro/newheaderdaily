import './env';
import fetch from 'node-fetch';
import Sentry from '../lib/sentry';

global.fetch = fetch;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

process.on('SIGINT', async () => {
    // drain
    await Sentry.close(2000);

    process.exit();
});
