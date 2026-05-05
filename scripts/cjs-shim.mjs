// cjs-shim.mjs — injected by esbuild to provide require() for CJS modules
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { require, __filename, __dirname };
