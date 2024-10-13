/** @type {import('./tester.d.ts').Tester} */
let tester;

try {
    tester = require('bun:test');
    console.log('using bun:test for testing');
} catch {
    try {
        tester = require('vitest');
        console.log('using vitest for testing');
    } catch {
        try {
            tester = require('jest');
            console.log('using jest for testing');
        } catch {
            throw new Error('not found lib for testing');
        }
    }
}

/** @type {import('./tester.d.ts').Tester} */
module.exports = tester;
