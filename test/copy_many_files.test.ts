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
const rerunEach: number = 10000;
const each: undefined[] = new Array(rerunEach).fill(undefined);

let numFiles: number | undefined;
let fileNames: string[] = [];
let copiedDistFolder: string | undefined;
let copiedDistFolderRelat: string | undefined;
let srcFiles: string[] = [];
let srcFilesRelat: string[] = [];
let copiedFiles: string[] = [];
let filesContents: string[] = [];

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

    const getRandBool = (): boolean => Math.random() >= 0.5;

    numFiles = 10;

    const randPathCopied: string[] = getRandPath(
        getRandNum(1, 9),
        0,
        20
    );

    copiedDistFolder = join(distFolder, ...randPathCopied);

    copiedDistFolderRelat = join(distFolderRelat, ...randPathCopied);

    for (let i = 0; i < numFiles; i++) {
        const fileName: string = getRandText(getRandNum(2, 20));
        fileNames.push(fileName);

        const randPath: string[] = getRandPath(
            getRandNum(1, 9),
            0,
            20
        );

        const srcFolder: string = join(distFolder, ...randPath);
        const srcFile: string = join(srcFolder, fileName);
        srcFiles.push(srcFile);
        const srcFolderRelat: string = join(
            distFolderRelat,
            ...randPath
        );
        const srcFileRelat: string = join(srcFolderRelat, fileName);
        srcFilesRelat.push(srcFileRelat);

        const copiedFile: string = join(copiedDistFolder, fileName);
        copiedFiles.push(copiedFile);

        const fileContent: string = getRandBool() ? '0' : '1'; // getRandText(getRandNum(1, 1000));
        filesContents.push(fileContent);

        fs.mkdirSync(srcFolder, { recursive: true });
        fs.writeFileSync(srcFile, fileContent);
    }
});

describe('copy many files', () => {
    test.each(each)(
        'copy many absolute files to an absolute folder',
        () => {
            copy(srcFiles, copiedDistFolder as string);

            const distFilesContents: string[] = [];
            for (let i = 0; i < (numFiles as number); i++) {
                const distFileContent: string = fs.readFileSync(
                    copiedFiles[i] as string,
                    'utf-8'
                );
                distFilesContents.push(distFileContent);

                if (distFileContent !== filesContents[i]) {
                    console.error('!!!!!!!!!!!!!!!!!!!');
                }
            }

            expect(distFilesContents).toEqual(filesContents);
        }
    );

    test.each(each)(
        'copy many relative files to an absolute folder',
        () => {
            copy(srcFilesRelat, copiedDistFolder as string);

            const distFilesContents: string[] = [];
            for (let i = 0; i < (numFiles as number); i++) {
                const distFileContent: string = fs.readFileSync(
                    copiedFiles[i] as string,
                    'utf-8'
                );
                distFilesContents.push(distFileContent);

                if (distFileContent !== filesContents[i]) {
                    console.error('!!!!!!!!!!!!!!!!!!!');
                }
            }

            expect(distFilesContents).toEqual(filesContents);
        }
    );

    test.each(each)(
        'copy many absolute files to a relative folder',
        () => {
            copy(srcFiles, copiedDistFolderRelat as string);

            const distFilesContents: string[] = [];
            for (let i = 0; i < (numFiles as number); i++) {
                const distFileContent: string = fs.readFileSync(
                    copiedFiles[i] as string,
                    'utf-8'
                );
                distFilesContents.push(distFileContent);

                if (distFileContent !== filesContents[i]) {
                    console.error('!!!!!!!!!!!!!!!!!!!');
                }
            }

            expect(distFilesContents).toEqual(filesContents);
        }
    );

    test.each(each)(
        'copy many relative files to a relative folder',
        () => {
            copy(srcFilesRelat, copiedDistFolderRelat as string);

            const distFilesContents: string[] = [];
            for (let i = 0; i < (numFiles as number); i++) {
                const distFileContent: string = fs.readFileSync(
                    copiedFiles[i] as string,
                    'utf-8'
                );
                distFilesContents.push(distFileContent);

                if (distFileContent !== filesContents[i]) {
                    console.error('!!!!!!!!!!!!!!!!!!!');
                }
            }

            expect(distFilesContents).toEqual(filesContents);
        }
    );
});

afterEach(() => {
    numFiles = undefined;
    fileNames = [];
    copiedDistFolder = undefined;
    copiedDistFolderRelat = undefined;
    srcFiles = [];
    srcFilesRelat = [];
    copiedFiles = [];
    filesContents = [];

    fs.rmSync(distFolder, { recursive: true, force: true });
});
