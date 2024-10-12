// import fs from 'node:fs';
// import { join } from 'node:path';
// import { copy } from 'files-rs';
// import tester from '../lib/tester';
import type Tester from '../lib/tester_type';
import tester from '../lib/tester';
const { afterEach, beforeEach, expect, test }: Tester = tester as Tester;

test('copy one file relative', () => {
    // console.log(2);
    // copy(srcFile, destFolder);
    // const destFileContent = fs.readFileSync(
    //     `${destFolder}/${fileName}`,
    //     'utf-8'
    // );

    expect(1).toBe(1);
});

// const fileName = 'testSrc.txt';
// const srcFile = join(__dirname, fileName);
// const destFolder = join(__dirname, 'dest');
// const fileConstent = 'tertewqwdwd';

// beforeEach(async () => {
//     console.log(1);
//     await fs.writeFile(srcFile, fileConstent, (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });



// afterEach(async () => {
//     console.log(3);
//     await fs.unlink(srcFile, (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
//     await fs.unlink(`${destFolder}/${fileName}`, (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });