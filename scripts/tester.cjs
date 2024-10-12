const { exec } = require('node:child_process');

const isComExist = (command) => {
  const cmd = process.platform === 'win32' ? `where ${command}` : `which ${command}`;

  return new Promise((res) => {
    exec(cmd, (err) => {
     res(!err)
    });
  });
}

const stdout = (err, stdout, stderr) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(stderr);
    console.log(stdout);
};

isComExist('bun').then(res=>{
    if(res){
        console.log('using bun');
        exec('bun test', stdout);
    }else{
        isComExist('pnpm').then(res=>{
            if(res){
                console.log('using pnpm');
                exec('pnpm vitest run', stdout);
            }else{
                isComExist('yarn').then(res=>{
                    if(res){
                        console.log('using yarn');
                        exec('yarn exec vitest run', stdout);
                    }else{
                        console.log('using npm');
                        exec('npx vitest run', stdout);
                    }
                })
            }
        })
    }
})