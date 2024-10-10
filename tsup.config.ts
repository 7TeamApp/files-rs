import type { Options } from 'tsup';

export default (<Options>{
    entryPoints: ['src/**/!(main).ts'],
    format: ['cjs', 'esm'],
    dts: true,
    cjsInterop: true,
    splitting: true,
    publicDir: './public',
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    keepNames: false,
    outDir: 'dist',
    external: [/.*node$/, /.*-javascript/]
});
