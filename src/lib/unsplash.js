import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_API_KEY,
    fetch: nodeFetch
});

export default unsplash;
