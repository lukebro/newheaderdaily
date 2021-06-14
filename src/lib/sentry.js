import * as Sentry from '@sentry/node';
import { name, version } from '../../package.json';
import * as Tracing from '@sentry/node';

Sentry.init({
    release: `${name}@${version}`,
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
    debug: true
});

export default Sentry;

