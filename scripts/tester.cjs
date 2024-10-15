var cp = require('node:child_process');

function stdout(err, stdout, stderr) {
    if (err) {
        throw new Error(err.message);
    }

    console.log(stderr);
    console.log(stdout);
}

function ifComExist(tester, fnTrue, fnFalse) {
    new Promise(function (res) {
        cp.exec(tester + ' --help', function (err) {
            res(!err);
        });
    }).then(function (res) {
        if (res) {
            console.log('using ' + tester);
            fnTrue();
        } else {
            fnFalse();
        }
    });
}

function std(tester) {
    switch (tester) {
        case 'bun': {
            break;
        }
        case 'pnpm': {
            break;
        }
        case 'yarn': {
            break;
        }
        case 'npm': {
            break;
        }
        default: {
            throw new Error('incorrect tester');
        }
    }
}

function exec(cmd) {
    cp.exec(cmd, stdout);
}

ifComExist(
    'bun',
    function () {
        exec('bun test .ts');
    },
    function () {
        ifComExist(
            'pnpm',
            function () {
                ifComExist(
                    'pnpm vitest',
                    function () {
                        exec('pnpm vitest run --dir test');
                    },
                    function () {
                        exec(
                            "pnpm jest --rootDir test_dist --testMatch '**/*.cjs'"
                        );
                    }
                );
            },
            function () {
                ifComExist(
                    'yarn',
                    function () {
                        ifComExist(
                            'yarn vitest',
                            function () {
                                exec('yarn vitest run --dir test');
                            },
                            function () {
                                exec(
                                    "yarn jest --rootDir test_dist --testMatch '**/*.cjs'"
                                );
                            }
                        );
                    },
                    function () {
                        ifComExist(
                            'npx vitest',
                            function () {
                                cp.exec('npx vitest run --dir test');
                            },
                            function () {
                                cp.exec(
                                    "npx jest --rootDir test_dist --testMatch '**/*.cjs'"
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);
