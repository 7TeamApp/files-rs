import fs from 'node:fs';
let Bun;

class File{

}

const _Bun = {
    write: (path: string, data: string) =>
        fs.writeFileSync(path, data, (err) =>
            console.error(err)
        )
    ,
    file: (path: string) => ({
        text: () => fs.readFileSync(path, 'utf8', err => 
            console.error(err)
        )
    })
};

try{
    Bun = _Bun;
    // Bun = require('bun');
}catch{
    Bun = _Bun;
}

export default _Bun;