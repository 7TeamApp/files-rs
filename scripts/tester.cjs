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
    var comandAndArgs = cmd.split(" ");
    var comand = comandAndArgs[0];
    var args = comandAndArgs.slice(1);
    console.log(comand, ' ', args); //!!!!!!!!!!
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
    ifComExist('bun', runBunTest, runNodeVitest);
}

function runBunTest() {
    console.log('using bun with bun:test');
    exec('bun test .ts', throwErr);
}

function runNodeVitest() {
    console.log('using node with vitest');
    exec('npx vitest run -r test', throwErr);
}

function runNodeJest() {
    console.log('using node with jest');
    exec(
        "npx jest --all --rootDir test_dist --testMatch '**/*.cjs'",
        throwErr
    );
}

runBun();
