import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

await build({
  entryPoints: [resolve(projectRoot, 'server/index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',  // CJS handles React's require('stream') natively
  outfile: resolve(projectRoot, 'dist/index.cjs'),
  external: [
    // Only externalize packages with native bindings or that must stay external
    'pg',
    'pg-native',
    'openai',
    'node-cron',
    'express',
    'compression',
    'serve-static',
  ],
  // Ignore CSS imports in SSR context
  plugins: [
    {
      name: 'ignore-css',
      setup(build) {
        build.onLoad({ filter: /\.css$/ }, () => ({
          contents: '',
          loader: 'empty',
        }));
      },
    },
  ],
  logLevel: 'info',
});

console.log('[build-server] Server bundle written to dist/index.cjs');
