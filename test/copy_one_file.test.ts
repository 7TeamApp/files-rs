import fs from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';
import { copy } from 'files-rs';

import tester from 'lib/tester';
Object.assign(global, tester);

const distFolderName: string = 'dist';
const distFolder: string = join(__dirname, '..', 'test_dist', distFolderName);
const distFolderRelat: string = join('.', 'test_dist', distFolderName);
const rerunEach: number = 200;
const each: number[] = new Array(rerunEach)
    .fill(undefined)
    .map((_, i) => i);

let copiedDistFolders: string[] = [];
let copiedDistFoldersRelat: string[] = [];
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

    for (let i = 0; i < rerunEach; i++) {
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
            const randPathCopied: string[] = getRandPath(
                getRandNum(1, 9),
                1,
                20
            );

            const copiedDistFolder: string = join(
                distFolder,
                ...randPathCopied
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
                const copiedDistFolderRelat: string = join(
                    distFolderRelat,
                    ...randPathCopied
                );
                copiedDistFoldersRelat.push(copiedDistFolderRelat);

                const srcFolderRelat: string = join(
                    distFolderRelat,
                    ...randPath
                );
                const srcFileRelat: string = join(
                    srcFolderRelat,
                    fileName
                );
                srcFilesRelat.push(srcFileRelat);

                copiedDistFolders.push(copiedDistFolder);

                srcFiles.push(srcFile);

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

describe('copy one file', () => {
    test.each(each)(
        'copy one absolute file to an absolute folder',
        (i: number) => {
            copy(srcFiles[i], copiedDistFolders[i]);

            const distFileContent: string = fs.readFileSync(
                copiedFiles[i],
                'utf-8'
            );

            expect(filesContents[i]).toBe(distFileContent);
        }
    );

    test.each(each)(
        'copy one relative file to an absolute folder',
        (i: number) => {
            copy(srcFilesRelat[i], copiedDistFolders[i]);

            const distFileContent: string = fs.readFileSync(
                copiedFiles[i],
                'utf-8'
            );

            expect(filesContents[i]).toBe(distFileContent);
        }
    );

    test.each(each)(
        'copy one absolute file to a relative folder',
        (i: number) => {
            copy(srcFiles[i], copiedDistFoldersRelat[i]);

            const distFileContent: string = fs.readFileSync(
                copiedFiles[i],
                'utf-8'
            );

            expect(filesContents[i]).toBe(distFileContent);
        }
    );

    test.each(each)(
        'copy one relative file to a relative folder',
        (i: number) => {
            copy(srcFilesRelat[i], copiedDistFoldersRelat[i]);

            const distFileContent: string = fs.readFileSync(
                copiedFiles[i],
                'utf-8'
            );

            expect(filesContents[i]).toBe(distFileContent);
        }
    );
});

afterEach(() => {
    copiedDistFolders = [];
    copiedDistFoldersRelat = [];
    srcFiles = [];
    srcFilesRelat = [];
    copiedFiles = [];
    filesContents = [];

    fs.rmSync(distFolder, { recursive: true, force: true });
});
