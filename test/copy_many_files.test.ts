import fs from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';
import { copy } from 'files-rs';

import tester from 'untester';
Object.assign(global, tester);

const distFolderName: string = 'dist2';

const distFolder: string = join(
    __dirname,
    '..',
    'test_dist',
    distFolderName
);
const distFolderRelat: string = join(
    '.',
    'test_dist',
    distFolderName
);
const rerunEach: number = 100;
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

    numFiles = getRandNum(1, 1000);

    const randPathCopied: string[] = getRandPath(
        getRandNum(1, 9),
        1,
        20
    );

    copiedDistFolder = join(distFolder, ...randPathCopied);

    copiedDistFolderRelat = join(distFolderRelat, ...randPathCopied);

    for (let i = 0; i < numFiles; i++) {
        let srcFolder: string;
        let srcFile: string;

        let isFileExist = true;

        do {
            const fileName: string = getRandText(getRandNum(2, 20));

            const randPath: string[] = getRandPath(
                getRandNum(1, 9),
                1,
                20
            );

            srcFolder = join(distFolder, ...randPath);
            srcFile = join(srcFolder, fileName);

            const copiedFile: string = join(
                copiedDistFolder,
                fileName
            );

            if (
                !(
                    srcFiles.includes(srcFile) ||
                    copiedFiles.includes(copiedFile) ||
                    srcFiles.includes(copiedFile)
                )
            ) {
                fileNames.push(fileName);

                srcFiles.push(srcFile);
                const srcFolderRelat: string = join(
                    distFolderRelat,
                    ...randPath
                );
                const srcFileRelat: string = join(
                    srcFolderRelat,
                    fileName
                );
                srcFilesRelat.push(srcFileRelat);

                copiedFiles.push(copiedFile);

                isFileExist = false;
            }
        } while (isFileExist);

        const fileContent: string = getRandText(getRandNum(1, 10000));
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
                    (copiedFiles as string[])[i],
                    'utf-8'
                );
                distFilesContents.push(distFileContent);
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
                    (copiedFiles as string[])[i],
                    'utf-8'
                );
                distFilesContents.push(distFileContent);
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
                    (copiedFiles as string[])[i],
                    'utf-8'
                );
                distFilesContents.push(distFileContent);
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
                    (copiedFiles as string[])[i],
                    'utf-8'
                );
                distFilesContents.push(distFileContent);
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
