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
    cp.exec(cmd, function (err, stdout, stderr) {
        if (err) {
            return callbackErr ? callbackErr(err.message) : null;
        }

        console.log(stderr);
        console.log(stdout);
        return callback ? callback() : null;
    });
}

function runBun() {
    ifComExist('bun', runBunTest, runNpxVitest);
}

function runBunTest() {
    console.log('using bun with bun:test');
    exec('bun test .ts', throwErr);
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
