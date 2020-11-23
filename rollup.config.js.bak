import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const external = Object.keys(pkg.dependencies || {});
const extensions = ['.ts', '.tsx', '.mjs', '.js', '.json'];

export default {
    input: 'src/main.ts',
    plugins: [
        nodeResolve({
            extensions
        }),
        commonjs(),
        babel({
            extensions
        }),
        terser(),
        replace({
            __VERSION__: JSON.stringify(pkg.version)
        })
    ],
    external,
    output: [
        {
            file: 'dist/main.js',
            format: 'cjs'
        }
    ]
};
