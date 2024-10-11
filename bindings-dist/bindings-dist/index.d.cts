/**
 * Copies files or directories from the specified source path(s) to the destination directory.
 *
 * @param pathStr - A string or an array of strings representing the path(s) to the source file(s) or directory(ies).
 * @param outDirStr - A string representing the path to the destination directory where the files or directories will be copied.
 */
declare const copy: (path: string | string[], outDir: string) => void;
/**
 * Copies files matching the specified glob pattern(s) to the destination directory.
 *
 * @param pattern - A string or an array of strings representing the glob pattern(s) to match the source files.
 * @param outDirStr - A string representing the path to the destination directory where the matched files will be copied.
 */
declare const copyGlob: (pattern: string | string[], outDir: string) => void;
declare const _default: {
    copy: (path: string | string[], outDir: string) => void;
    copyGlob: (pattern: string | string[], outDir: string) => void;
};

export { copy, copyGlob, _default as default };
