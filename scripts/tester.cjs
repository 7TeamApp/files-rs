var cp = require('node:child_process');

function throwErr(){
    throw new Error();
}

function ifComExist(tester, fnTrue, fnFalse) {
    new Promise(function (res) {
        cp.exec(tester + ' --help', function (err) {
            res(!err);
        });
    }).then(function (res) {
        if (res) {
            fnTrue();
        } else {
            fnFalse();
        }
    });
}

function exec(cmd, callbackErr, callback) {
    cp.exec(cmd, function stdout(err, stdout, stderr) {
        if (err) {
            console.error(err.message);
            return callbackErr ? callbackErr() : null;
        }

        console.log(stderr);
        console.log(stdout);
        return callback ? callback() : null;
    });
}

function runBun(){
    ifComExist('bun', runBunTest, runPnpm);
}

function runPnpm(){
    ifComExist(
        'pnpm',
        function () {
            ifComExist('pnpm vitest', runPnpmVitest, runPnpmJest);
        },
        runYarn
    );
}

function runYarn(){
    ifComExist(
        'yarn',
        function () {
            ifComExist(
                'yarn vitest',
                runYarnVitest,
                runYarnJest
            );
        },
        function () {
            ifComExist(
                'npx vitest',
                runNpxVitest,
                runNpxJest
            );
        }
    );
}

function runBunTest() {
    console.log('using bun with bun:test');
    exec('bun test .ts', throwErr);
}

function runPnpmVitest() {
    console.log('using pnpm with vitest');
    exec('pnpm vitest run --no-file-parallelism --dir test', runPnpmJest);
}

function runPnpmJest() {
    console.log('using pnpm with jest');
    exec("pnpm jest --rootDir test_dist --testMatch '**/*.cjs'", throwErr);
}

function runYarnVitest() {
    console.log('using yarn with vitest');
    exec('yarn vitest run --no-file-parallelism --dir test', runYarnJest);
}

function runYarnJest() {
    console.log('using yarn with jest');
    exec("yarn jest --all --rootDir test_dist --testMatch '**/*.cjs'", throwErr);
}

function runNpxVitest() {
    console.log('using npx with vitest');
    exec('npx vitest run --no-file-parallelism --dir test', runNpxJest);
}

function runNpxJest() {
    console.log('using npx with jest');
    exec("npx jest --all --rootDir test_dist --testMatch '**/*.cjs'", throwErr);
}

runBun();