import Bun from '../lib/bun';

const pg = await Bun.file('package.json').json();

if (!pg.version) {
    pg.version = '0.0.0';

    await Bun.write('package.json', JSON.stringify(pg, null, 2));
}

if (!(await Bun.file('.git/HEAD').exists())) {
    await Bun.spawn(['git', 'init']).exited;

    await Bun.spawn(['git', 'add', '.']).exited;

    await Bun.spawn(['git', 'commit', '-m', 'Initial commit']).exited;

    const realName = pg.name.split('/', 2);

    // await Bun.spawn(['gh', 'auth', 'login']).exited;

    const repoName = `${pg.productName ? pg.productName : realName[1] ? realName[1] : realName[0]}`;

    const createRepo: string[] = [
        'gh',
        'repo',
        'create',
        repoName,
        pg.description ? `-d ${pg.description}` : '',
        pg.private
            ? ''
            : `-h ${realName[1] ? `https://www.npmjs.com/package/${realName[0]}/${realName[1]}` : `https://www.npmjs.com/package/${pg.name}`}`,
        '--public',
        '--source=.',
        '--remote=origin',
        '--push'
    ];

    await Bun.spawn(createRepo).exited;

    const setDefault: string[] = [
        'gh',
        'repo',
        'set-default',
        repoName,
        '-u'
    ];

    await Bun.spawn(setDefault).exited;
}
