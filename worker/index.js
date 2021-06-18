import './setup';
import schedule from 'node-schedule';
import Sentry from '../src/lib/sentry';
import processSchedule from './jobs/process-schedule';


let processing = false;

/**
 * Every 10 seconds we'll run this job unless busy.
 */
schedule.scheduleJob('*/60 * * * *', async () => {
    if (processing) {
        // skip scheduling another task when one is running
        return;
    }

    try {
        processing = true;
        await processSchedule();
    } catch (e) {
        console.error(e);
        Sentry.captureException(e);
    }

    processing = false;
});
