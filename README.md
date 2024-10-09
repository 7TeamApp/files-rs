# files-rs

A native Node.js library written in Rust that provides functions for copying files and directories using glob patterns.

## Features

- Copy single files or multiple files at once.
- Support for glob patterns to match files.
- Handles both files and directories.
- Written in Rust for performance and safety.

## Installation

Use your preferred package manager to install `files-rs` along with its peer dependencies.

### Using npm

```bash
npm install files-rs
```

### Using pnpm

```bash
pnpm install files-rs
```

### Using yarn

```bash
yarn add files-rs
```

### Using bun

```bash
bun add files-rs
```

## Usage

### Copying Files and folders

To copy a file(s) or folder(s), use the `copy` function:

```javascript
import { copy } from 'files-rs';

try{
    //copy single file:
    copy('path/to/source/file.txt', 'path/to/destination');
    //copy multiple files:
    copy(['path/to/file1.txt', 'path/to/file2.txt'], 'path/to/destination');
    //copy single folder:
    copy('path/to/source', 'path/to/destination');
    //copy multiple folders:
    copy(['path/to/source1', 'path/to/source2'], 'path/to/destination');
    //copy files and forders:
    copy(['path/to/source1', 'path/to/source2/file.txt'], 'path/to/destination');
}catch(err){
    console.error('Copying error:', err);
}
```

### Copying with Glob Patterns

You can also use glob patterns to copy files:

```javascript
import { copyGlob } from 'files-rs';

try{
    copy(glob, 'path/to/destination');
    copy([glob1, glob2], 'path/to/destination');

    //example:
    const glob = '**/some_dir/**/*.txt';
    copy(glob, 'path/to/destination');

    const glob1 = '**/some_dir1/**/some_file.*';
    const glob2 = '**/some_dir1/**/some_dir2/*';
    copy([glob1, glob2], 'path/to/destination');
}catch(err){
    console.error('Copying error:', err);
}
```
