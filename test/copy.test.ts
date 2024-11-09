import fs from 'node:fs';
import { join } from 'node:path';
import { copy } from 'files-rs';
import { test, expect, beforeEach, afterEach } from 'lib/tester';
import { console } from 'node:inspector';

const fileName = 'testSrc.txt';
const srcFile = join(__dirname, fileName);
const destFolder = join(__dirname, 'dest');
const fileConstent = 'tertewqwdwd';

beforeEach(() => {
    fs.writeFileSync(srcFile, fileConstent);
});

test('copy one file relative', () => {
    copy(srcFile, destFolder);
    const destFileContent = fs.readFileSync(
        `${destFolder}/${fileName}`,
        'utf-8'
    );

    expect(fileConstent).toBe(destFileContent);
});

afterEach(() => {
    fs.unlinkSync(srcFile);
    fs.unlinkSync(`${destFolder}/${fileName}`);
});
