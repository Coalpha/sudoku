import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';
// import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

function makeOutput(format, outfile, plugins) {
  return ({
    input: 'src/main.js',
    moduleName: 'Sudoku', // yep, that's painful
    output: {
      format,
      file: outfile,
      name: 'window',
      strict: true,
    },
    plugins: [typescript(), babel(), ...plugins],
  });
}
const production = !process.env.ROLLUP_WATCH;
export default ((() => {
  if (production) {
    process.env.BABEL_ENV = 'production';
    return [
      makeOutput('iife', 'bundle.min.js', [terser()]),
    ];
  }
  const o = makeOutput('iife', 'bundle.min.js', [
    serve({
      contentBase: '.',
      port: 8080,
    }),
    livereload({
      watch: '.',
      verbose: true,
    }),
  ]);
  o.output.sourcemap = true;
  o.watch = {
    include: 'src/**',
  };
  return o;
})());
