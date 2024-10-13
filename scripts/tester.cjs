var cp = require('node:child_process');

function stdout(err, stdout, stderr) {
    if (err) {
        throw new Error(err.message);
    }

    console.log(stderr);
    console.log(stdout);
}

function isComExist(cmd) {
    return new Promise(function (res) {
        cp.exec(cmd + ' --help', function (err) {
            res(!err);
        });
    });
}

isComExist('1bun').then(function (res) {
    if (res) {
        console.log('using bun');
        cp.exec('bun test .ts', stdout);
    } else {
        isComExist('1pnpm').then(function (res) {
            if (res) {
                console.log('using pnpm');
                isComExist('pnpm vitest').then(function (res) {
                    if (res) {
                        cp.exec('pnpm vitest run --dir test', stdout);
                    } else {
                        cp.exec(
                            'pnpm jest --rootDir test_dist',
                            stdout
                        );
                    }
                });
            } else {
                isComExist('1yarn').then(function (res) {
                    if (res) {
                        console.log('using yarn');
                        isComExist('yarn vitest').then(
                            function (res) {
                                if (res) {
                                    cp.exec(
                                        'yarn vitest run --dir test',
                                        stdout
                                    );
                                } else {
                                    cp.exec(
                                        'yarn jest --rootDir test_dist',
                                        stdout
                                    );
                                }
                            }
                        );
                    } else {
                        console.log('using npm');
                        isComExist('npx vitest').then(function (res) {
                            if (res) {
                                cp.exec(
                                    'npx vitest run --dir test',
                                    stdout
                                );
                            } else {
                                cp.exec(
                                    'npx jest --rootDir test_dist',
                                    stdout
                                );
                            }
                        });
                    }
                });
            }
        });
    }
});
