import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const defaults = {
  compilerOptions: {
    declaration: true,
  },
};
const override = {
  compilerOptions: {
    declaration: false,
  },
};
function makeOutput(format, outfile, plugins) {
  return ({
    input: 'src/main.ts',
    moduleName: 'Sudoku',
    output: {
      format,
      file: outfile,
      name: 'Sudoku',
      strict: true,
    },
    plugins: [resolve(), typescript({
      tsconfigDefaults: defaults,
      tsconfig: 'tsconfig.json',
      tsconfigOverride: override,
    }), ...plugins],
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
