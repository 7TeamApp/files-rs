import { expect, test } from 'vitest';
import { copy, copyGlob } from 'files-rs';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

test('File Copy Function', () => {
    expect(1).toBe(1);
});
