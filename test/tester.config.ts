import babel from 'esbuild-plugin-babel';
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
    tsconfig: 'test/tsconfig.json',
    outExtension: (ctx) =>
        ctx.format === 'cjs' ? { js: '.js' } : { js: '.mjs' },
    // esbuildPlugins: [
    //     babel({
    //         filter: /.*/,
    //         config: {
    //             presets: [
    //                 [
    //                     '@babel/preset-env',
    //                     {
    //                         targets: {
    //                             node: '12'
    //                         }
    //                     }
    //                 ]
    //             ]
    //         }
    //     })
    // ],
    // noExternal: ['lib']
});
