let tester = {};

try {
    tester = await import('bun:test');
    console.log('using bun:test for testing');
} catch {
    try {
        tester = await import('vitest');
        console.log('using vitest for testing');
    } catch {
        try {
            tester = await import('@jest/globals');
            console.log('using jest for testing');
        } catch {
            console.error('not found lib for testing');
        }
    }
}

export default tester;
