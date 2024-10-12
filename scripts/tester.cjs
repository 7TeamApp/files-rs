var cp = require('node:child_process');

function stdout(err, stdout, stderr) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(stderr);
    console.log(stdout);
}

function isnComExist(cmd){
    return new Promise(function (res) {
        cp.exec(cmd + '--help', function (err) {
            res(Boolean(err));
        });
    });
}

isnComExist('bun').then(function (res) {
    if (res) {
        console.log('using bun');
        cp.exec('bun test .ts', stdout);
    } else {
        isnComExist('pnpm').then(function (res) {
            if (res) {
                console.log('using pnpm');
                if(isnComExist('pnpm vitest')){
                    cp.exec('pnpm jest --rootDir test_dist', stdout);
                }else{
                    cp.exec('pnpm vitest run --dir test', stdout);
                }
            } else {
                isnComExist('yarn').then(function (res) {
                    if (res) {
                        console.log('using yarn');
                        if(isnComExist('yarn exec vitest')){
                            cp.exec('yarn exec jest --rootDir test_dist', stdout);
                        }else{
                            cp.exec('yarn exec vitest run --dir test', stdout);
                        }
                    } else {
                        console.log('using npm');
                        if(isnComExist('npx vitest')){
                            cp.exec('npx jest --rootDir test_dist', stdout);
                        }else{
                            cp.exec('npx vitest run --dir test', stdout);
                        }
                        
                    }
                });
            }
        });
    }
});
