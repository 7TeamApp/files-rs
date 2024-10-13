/** @type {import('./tester.d.ts').Tester} */
var tester;

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
            throw new Error('not found lib for testing');
        }
    }
}

export const {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    jest,
    mock,
    setDefaultTimeout,
    setSystemTime,
    spyOn,
    test
} = tester;

export default tester;
