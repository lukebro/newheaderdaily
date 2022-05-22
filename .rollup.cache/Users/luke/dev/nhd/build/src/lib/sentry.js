import * as Sentry from '@sentry/node';
import { name, version } from '../../package.json';
import '@sentry/tracing';
var isProd = process.env.NODE_ENV === 'production';
Sentry.init({
    release: "".concat(name, "@").concat(version),
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: isProd ? 'prod' : 'dev',
    debug: !isProd
});
export default Sentry;
//# sourceMappingURL=sentry.js.map