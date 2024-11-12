var cp = require('node:child_process');

function throwErr(message) {
    console.error(message);
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
    var comand_and_args = cmd.split(" ");
    var comand = comand_and_args[0];
    var args = comand_and_args.slice(1);
    var child = cp.spawn(comand, args);

    child.stdout.on('data', function (data) {
        console.log(data);
    });

    child.stderr.on('data', function (data) {
        console.error(data);
    });

    child.on('error', function (err) {
        return callbackErr ? callbackErr(err.message) : null;
    });

    child.on('close', function (code) {
        console.log('Child process exited with code ' + code);
        return callback ? callback() : null;
    });
}

function runBun() {
    ifComExist('bun', runBunTest, runPnpm);
}

function runPnpm() {
    ifComExist(
        'pnpm',
        function () {
            ifComExist('pnpm vitest', runPnpmVitest, runPnpmJest);
        },
        runYarn
    );
}

function runYarn() {
    ifComExist(
        'yarn',
        function () {
            ifComExist('yarn vitest', runYarnVitest, runYarnJest);
        },
        function () {
            ifComExist('npx vitest', runNpxVitest, runNpxJest);
        }
    );
}

function runBunTest() {
    console.log('using bun with bun:test');
    exec('bun test .ts', throwErr);
}

function runPnpmVitest() {
    console.log('using pnpm with vitest');
    exec('pnpm vitest run -r test', runPnpmJest);
}

function runPnpmJest() {
    console.log('using pnpm with jest');
    exec(
        "pnpm jest --rootDir test_dist --testMatch '**/*.cjs'",
        throwErr
    );
}

function runYarnVitest() {
    console.log('using yarn with vitest');
    exec('yarn vitest run -r test', throwErr);
}

function runYarnJest() {
    console.log('using yarn with jest');
    exec(
        "yarn jest --all --rootDir test_dist --testMatch '**/*.cjs'",
        throwErr
    );
}

function runNpxVitest() {
    console.log('using npx with vitest');
    exec('npx vitest run -r test', throwErr);
}

function runNpxJest() {
    console.log('using npx with jest');
    exec(
        "npx jest --all --rootDir test_dist --testMatch '**/*.cjs'",
        throwErr
    );
}

runBun();
