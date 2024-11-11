import fs from 'node:fs';
import { join, basename } from 'node:path';

export const jsCopyGlobMulty = (
    patterns: string[],
    outDir: string
): void => {};
export const jsCopyGlobSingle = (
    pattern: string,
    outDir: string
): void => {};
export const jsCopyMulty = (
    pathsStr: string[],
    outDir: string
): void => {
    for (const path of pathsStr) {
        jsCopySingle(path, outDir);
    }
};
export const jsCopySingle = (
    pathStr: string,
    outDir: string
): void => {
    fs.mkdirSync(outDir, { recursive: true });

    const fileName: string = basename(pathStr);
    const targetPath: string = join(outDir, fileName);
    fs.copyFileSync(pathStr, targetPath);
};

export default {
    jsCopyGlobMulty,
    jsCopyGlobSingle,
    jsCopyMulty,
    jsCopySingle
};
