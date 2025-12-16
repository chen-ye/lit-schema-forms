import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: {
    browser: true,
  },
  files: 'test/**/*.test.ts',
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2022',
      tsconfig: './tsconfig.json',
    }),
  ],
};
