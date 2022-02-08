// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/server.ts',
    output: {
        dir: 'build',
        format: 'cjs'
    },
    plugins: [typescript({
        module: "esnext"
    })]
};