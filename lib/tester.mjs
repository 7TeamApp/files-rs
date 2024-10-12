/** @type {import('./tester.d.ts').Tester} */
let tester;

try {
    tester = await import('bun:test');
    console.log('using bun:test for testing');
} catch {
    try {
        tester = await import('vitest');
        console.log('using vitest for testing');
    } catch {
        try {
            tester = await import('jest');
            console.log('using jest for testing');
        } catch {
            throw new Error('not found lib for testing');
        }
    }
}

export default tester;
