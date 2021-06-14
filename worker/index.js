import './setup';
import schedule from 'node-schedule';
import Sentry from '../src/lib/sentry';
import processSchedule from './jobs/process-schedule';

/**
 * Every 10 seconds we'll run this job.
 */
schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
        await processSchedule();
    } catch (e) {
        Sentry.captureException(e);
    }
});
