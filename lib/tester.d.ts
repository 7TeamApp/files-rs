import 'bun-types/test'
import type BunTest from 'bun:test';

export type Tester = typeof BunTest;
declare const tester: Tester;
export default tester;