import { exec } from 'node:child_process';
import fs from 'node:fs';
let Bun;

const _Bun = {
    write: (path: string, data: string) =>
        fs.writeFileSync(path, data, (err) => console.error(err)),
    file: (path: string) => ({
        text: (): string =>
            fs.readFileSync(path, 'utf8', (err) =>
                console.error(err)
            ),

        json: () =>
            JSON.parse(
                fs.readFileSync(path, 'utf8', (err) =>
                    console.error(err)
                )
            ),
        exists: () => fs.existsSync(path)
    }),
    spawn: (args: string[]) => ({
        exited: new Promise((res, rej) => {
            exec(args.join(' '), (err, stdout, stderr) => {
                if (err) {
                    rej(console.error(err.message));
                    return;
                }

                if (stderr) {
                    rej(console.error(stderr));
                    return;
                }

                res(console.log(`\n${stdout}`));
            });
        })
    })
};

try {
    Bun = require('bun');
} catch {
    Bun = _Bun;
}

export default Bun;
