import * as Sentry from '@sentry/node';
import { name, version } from '../../package.json';
import '@sentry/tracing';

const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
    release: `${name}@${version}`,
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: isProd ? 'prod' : 'dev',
    debug: !isProd
});

export default Sentry;

