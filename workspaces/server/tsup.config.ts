import path from 'node:path';

import findPackageDir from 'pkg-dir';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig(async (): Promise<Options[]> => {
  const NODE_ENV = process.env['NODE_ENV'] || 'development';

  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  return [
    {
      clean: true,
      define: { 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) },
      entry: {
        server: path.resolve(PACKAGE_DIR, 'src/server.tsx'),
      },
      env: {
        API_URL: process.env['KOYEB_PUBLIC_DOMAIN']
          ? `https://${process.env['KOYEB_PUBLIC_DOMAIN']}`
          : 'http://localhost:8000',
        NODE_ENV,
      },
      format: 'cjs',
      metafile: true,
      noExternal: [/@wsh-2024\/.*/],
      outDir: OUTPUT_DIR,
      sourcemap: NODE_ENV !== 'production',
      target: 'node18',
    },
  ];
});
