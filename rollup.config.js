import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import { terser } from "rollup-plugin-terser";

const { PRODUCTION } = process.env;

export default {
  input: 'sources/js/index.js',
  output: {
    file: 'docs/script.min.js',
    format: 'esm',
    sourcemap: PRODUCTION ? false : true
  },
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    terser(),
    copy({
      targets: [
        { src: 'sources/index.html', dest: 'docs/' }
      ]
    }),
    (PRODUCTION && del({ targets: 'docs/*' })),
    (!PRODUCTION && serve({ open: true, contentBase: 'docs' })),
    (!PRODUCTION && livereload())
  ]
};