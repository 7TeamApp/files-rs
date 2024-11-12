import fs from './main.ts';

/**
 * Copies files or directories from the specified source path(s) to the destination directory.
 *
 * @param pathStr - A string or an array of strings representing the path(s) to the source file(s) or directory(ies).
 * @param outDirStr - A string representing the path to the destination directory where the files or directories will be copied.
 */
export const copy = (path: string | string[], outDir: string) => {
    if (typeof path === 'string') {
        fs.jsCopySingle(path, outDir);
    } else if (Array.isArray(path)) {
        fs.jsCopyMulty(path, outDir);
    } else {
        throw new Error('path must be string or array of strings');
    }
};

/**
 * Copies files matching the specified glob pattern(s) to the destination directory.
 *
 * @param pattern - A string or an array of strings representing the glob pattern(s) to match the source files.
 * @param outDirStr - A string representing the path to the destination directory where the matched files will be copied.
 */
export const copyGlob = (
    pattern: string | string[],
    outDir: string
) => {
    if (typeof pattern === 'string') {
        fs.jsCopyGlobSingle(pattern, outDir);
    } else if (Array.isArray(pattern)) {
        fs.jsCopyGlobMulty(pattern, outDir);
    } else {
        throw new Error('pattern must be string or array of strings');
    }
};

export default { copy, copyGlob };
