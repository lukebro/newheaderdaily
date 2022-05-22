import { dependencies } from './package.json';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const external = Object.keys(dependencies);

export default {
    input: 'src/worker/index.ts',
    output: {
        file: 'build/worker.js',
        format: 'cjs',
    },
    external: [...external],
    plugins: [
        typescript({
            outputToFilesystem: false,
            rootDir: '.',
            compilerOptions: {
                outDir: 'build',
                jsx: 'react-jsx'
            },
        }),
        json(),
    ],
};
