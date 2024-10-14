/** @type {import('./tester.d.ts').Tester} */
var tester;

try {
    tester = require('bun:test');
    console.log('using bun:test for testing');
} catch {
    try {
        tester = require('vitest');
        console.log('using vitest for testing');
    } catch {
        try {
            tester = require('@jest/globals');
            console.log('using jest for testing');
        } catch {
            throw new Error('not found lib for testing');
        }
    }
}

module.exports = tester;
