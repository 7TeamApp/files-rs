import type { Options } from 'tsup';

export default (<Options>{
    entryPoints: ['scripts/**/!(tsup.config.ts)'],
    format: ['esm'],
    dts: false,
    outDir: 'dist',
    external: ['bun','chalk', 'fast-glob', /^node:/, 'path', 'url', /.*node$/]
});
