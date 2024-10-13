var cp = require('node:child_process');

function stdout(err, stdout, stderr) {
    if (err) {
        console.error(err.message);
        return;
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

isComExist('bun').then(function (res) {
    if (res) {
        console.log('using bun');
        cp.exec('bun test .ts', stdout);
    } else {
        isComExist('pnpm').then(function (res) {
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
                isComExist('yarn').then(function (res) {
                    if (res) {
                        console.log('using yarn');
                        isComExist('yarn exec vitest').then(
                            function (res) {
                                if (res) {
                                    cp.exec(
                                        'yarn exec vitest run --dir test',
                                        stdout
                                    );
                                } else {
                                    cp.exec(
                                        'yarn exec jest --rootDir test_dist',
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
