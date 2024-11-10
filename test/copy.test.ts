import fs from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';
import { copy } from 'files-rs';
import { test, expect, beforeEach, afterEach } from 'lib/tester';

const distFolder: string = join(__dirname, 'dist');
const rerunEach: number = 1000;
const each = new Array(rerunEach).fill(undefined);

let fileName: string;
let copiedDistFolder: string;
let srcFile: string;
let copiedFile: string;
let fileConstent: string;

beforeEach(() => {
    const getRandText = (length: number): string =>
        crypto.randomBytes(length).toString('hex').slice(0, length);

    const getRandNum = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const getRandPath = (
        count: number,
        min: number,
        max: number
    ): string[] => {
        const randStrs: string[] = [];
        for (let i = 0; i < count; i++) {
            randStrs.push(getRandText(getRandNum(min, max)));
        }

        return randStrs;
    };

    fileName = getRandText(getRandNum(2, 20));
    copiedDistFolder = join(
        distFolder,
        ...getRandPath(getRandNum(1, 9), 2, 20)
    );
    srcFile = join(distFolder, fileName);
    copiedFile = join(copiedDistFolder, fileName);
    fileConstent = getRandText(getRandNum(1, 1000));

    fs.mkdirSync(distFolder, { recursive: true });
    fs.writeFileSync(srcFile, fileConstent);
});

test.each(each)('copy one file relative', () => {
    copy(srcFile, copiedDistFolder);

    const destFileContent = fs.readFileSync(copiedFile, 'utf-8');

    expect(fileConstent).toBe(destFileContent);
});

afterEach(() => {
    fs.rmSync(distFolder, { recursive: true, force: true });
});
