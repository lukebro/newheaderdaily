declare module 'node-schedule' {
    function scheduleJob(cron: string, job: () => Promise): void;
}
