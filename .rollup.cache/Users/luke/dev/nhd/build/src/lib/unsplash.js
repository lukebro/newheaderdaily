import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
var unsplash = createApi({
    accessKey: process.env.UNSPLASH_API_KEY,
    fetch: nodeFetch
});
export default unsplash;
//# sourceMappingURL=unsplash.js.map