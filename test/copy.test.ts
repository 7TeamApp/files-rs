import fs from 'node:fs';
import { join } from 'node:path';
import { copy } from 'files-rs';
import { test, expect, beforeEach, afterEach } from 'lib/tester';

const fileName = 'testSrc.txt';
const srcFile = join(__dirname, fileName);
const destFolder = join(__dirname, 'dest');
const fileConstent = 'tertewqwdwd';

beforeEach(async () => {
    await fs.writeFile(srcFile, fileConstent, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

test('copy one file relative', () => {
    copy(srcFile, destFolder);
    const destFileContent = fs.readFileSync(
        `${destFolder}/${fileName}`,
        'utf-8'
    );

    expect(fileConstent).toBe(destFileContent);
});

afterEach(async () => {
    await fs.unlink(srcFile, (err) => {
        if (err) {
            console.error(err);
        }
    });
    await fs.unlink(`${destFolder}/${fileName}`, (err) => {
        if (err) {
            console.error(err);
        }
    });
});
