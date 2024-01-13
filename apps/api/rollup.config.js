/* eslint-disable @typescript-eslint/no-var-requires */
const typescript = require('rollup-plugin-typescript2');

module.exports = {
  input: 'src/server.ts',
  output: {
    format: 'cjs',
    dir: 'dist'
  },
  plugins: [typescript()]
};
