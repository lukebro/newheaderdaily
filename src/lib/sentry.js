import * as Sentry from '@sentry/node';
import { name, version } from '../../package.json';
import * as Tracing from '@sentry/node';

const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
    release: `${name}@${version}`,
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [new Tracing.Integrations.MySQL()],
    environment: isProd ? 'prod' : 'dev',
    debug: !isProd
});

export default Sentry;

