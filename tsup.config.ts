import type { Options } from 'tsup';

export default (<Options>{
    entryPoints: ['src/**/!(main).ts'],
    format: ['cjs', 'esm'],
    dts: true,
    cjsInterop: true,
    splitting: true,
    publicDir: './public',
    minify: false,
    minifyWhitespace: false,
    minifyIdentifiers: false,
    minifySyntax: false,
    keepNames: true,
    outDir: 'dist',
    external: [/.*node$/, /.*-javascript/]
});
