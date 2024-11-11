import fs from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';
import { copy } from 'files-rs';
import {
    test,
    expect,
    describe,
    beforeEach,
    afterEach
} from 'lib/tester';

const distFolderName: string = 'dist';
const distFolder: string = join(__dirname, distFolderName);
const distFolderRelat: string = join('.', 'test', distFolderName);
const rerunEach: number = 100;
const each: undefined[] = new Array(rerunEach).fill(undefined);

let fileName: string | undefined;
let copiedDistFolder: string | undefined;
let copiedDistFolderRelat: string | undefined;
let srcFile: string | undefined;
let srcFileRelat: string | undefined;
let copiedFile: string | undefined;
let fileContent: string | undefined;

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
    const randPath: string[] = getRandPath(getRandNum(1, 9), 0, 20);
    const randPathCopied: string[] = getRandPath(
        getRandNum(1, 9),
        0,
        20
    );

    copiedDistFolder = join(distFolder, ...randPathCopied);
    copiedDistFolderRelat = join(distFolderRelat, ...randPathCopied);

    const srcFolder: string = join(distFolder, ...randPath);
    srcFile = join(srcFolder, fileName);
    const srcFolderRelat: string = join(distFolderRelat, ...randPath);
    srcFileRelat = join(srcFolderRelat, fileName);

    copiedFile = join(copiedDistFolder, fileName);

    fileContent = getRandText(getRandNum(1, 1000));

    fs.mkdirSync(srcFolder, { recursive: true });
    fs.writeFileSync(srcFile, fileContent);
});

describe('copy one file', () => {
    test.each(each)(
        'copy one absolute file to an absolute folder',
        () => {
            copy(srcFile as string, copiedDistFolder as string);

            const distFileContent: string = fs.readFileSync(
                copiedFile as string,
                'utf-8'
            );

            expect(fileContent).toBe(distFileContent);
        }
    );

    test.each(each)(
        'copy one relative file to an absolute folder',
        () => {
            copy(srcFileRelat as string, copiedDistFolder as string);

            const distFileContent: string = fs.readFileSync(
                copiedFile as string,
                'utf-8'
            );

            expect(fileContent).toBe(distFileContent);
        }
    );

    test.each(each)(
        'copy one absolute file to a relative folder',
        () => {
            copy(srcFile as string, copiedDistFolderRelat as string);

            const distFileContent: string = fs.readFileSync(
                copiedFile as string,
                'utf-8'
            );

            expect(fileContent).toBe(distFileContent);
        }
    );

    test.each(each)(
        'copy one relative file to a relative folder',
        () => {
            copy(
                srcFileRelat as string,
                copiedDistFolderRelat as string
            );

            const distFileContent: string = fs.readFileSync(
                copiedFile as string,
                'utf-8'
            );

            expect(fileContent).toBe(distFileContent);
        }
    );
});

afterEach(() => {
    fileName = undefined;
    copiedDistFolder = undefined;
    copiedDistFolderRelat = undefined;
    srcFile = undefined;
    srcFileRelat = undefined;
    copiedFile = undefined;
    fileContent = undefined;

    fs.rmSync(distFolder, { recursive: true, force: true });
});
