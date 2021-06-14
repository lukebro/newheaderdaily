import { dependencies } from './package.json';
import json from '@rollup/plugin-json';

const external = Object.keys(dependencies);

export default {
    input: 'worker/index.js',
    output: {
        file: './build/worker.js',
        format: 'cjs',
    },
    external: [...external],
    plugins: [json()]
};