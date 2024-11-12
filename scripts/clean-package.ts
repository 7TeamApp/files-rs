import Bun from '../lib/bun.ts';

const pg = await Bun.file('./package.json').json();

pg.scripts = undefined;
pg.devDependencies = undefined;
pg.napi = undefined;
pg.packageManager = undefined;
pg.overrides = undefined;
pg.resolutions = undefined;
pg.pnpm = undefined;

await Bun.write('./package.json', JSON.stringify(pg));
