import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

function makeOutput(format, outfile, ...plugins) {
  return ({
    input: 'src/main.js',
    moduleName: 'Hangul',
    output: {
      format,
      file: outfile,
      name: 'Sudoku',
      strict: true,
    },
    plugins: [resolve(), babel(), ...plugins],
  });
}
const production = !process.env.ROLLUP_WATCH;
export default ((() => {
  if (production) {
    process.env.BABEL_ENV = 'production';
    return [
      makeOutput('iife', 'static/bundle.min.js', terser()),
    ];
  }
  const o = makeOutput('iife', 'static/bundle.min.js', [
    serve({
      contentBase: 'static',
      port: 8080,
    }),
    livereload('static'),
  ]);
  o.output.sourcemap = true;
  o.watch = {
    include: 'src/**',
  };
  return o;
})());
