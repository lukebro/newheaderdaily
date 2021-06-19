# newheaderdaily.com

Login with your twitter and a new header photo will be chosen from Unsplash daily and uploaded.


## Getting Started

1. Copy the `.env.sample` file and fill out the necessary environment variables.
1. Run `prisma migrate deploy` to apply the current DB migrations to your database.
1. To start the Next.js app, run `npm run dev`
1. To start the worker which processes headers, run `npm run build-worker -- --watch` in one shell, and `npm run start-worker`.  Any time you make changes to the worker, you need to restart it. You can do it manually or use something like `nodemon` to restart when the dist files change.


## Useful Info

We capture the `utc_offset` of every user, and schedule the header to be changed at 3am there time.  You'll see this logic sprinkled throughout the app.

