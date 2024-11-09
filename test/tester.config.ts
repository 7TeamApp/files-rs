import type { Options } from 'tsup';

export default (<Options>{
    entryPoints: ['test/**/!(tester.config).ts'],
    format: ['cjs'],
    dts: false,
    cjsInterop: true,
    splitting: true,
    publicDir: undefined,
    outDir: 'test_dist',
    clean: true,
    minify: false,
    skipNodeModulesBundle: true,
    tsconfig: 'test/tester.tsconfig.json',
    outExtension: (ctx) =>
        ctx.format === 'cjs' ? { js: '.cjs' } : { js: '.mjs' }
});
