import Bun from 'bun';

const pathJs = 'dist/main.js';
let cjFile = await Bun.file(pathJs).text();
cjFile = cjFile.replace(
    /\s*module\.exports\.(?<var>[a-zA-z]([a-zA-z]|\d)*)\s*=\s*(\k<var>)\s*/g,
    ''
);
cjFile = cjFile.replace(
    /const\s*{((\s*([a-zA-z]([a-zA-z]|\d)*\s*,\s*)*)?[a-zA-z]([a-zA-z]|\d)*,?\s*|\s*)}\s*=\s*nativeBinding\s*/,
    '\nexport ' + '$&'
);
await Bun.write(pathJs, cjFile);
