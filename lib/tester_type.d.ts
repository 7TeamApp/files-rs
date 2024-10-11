import 'bun-types/test'
import type BunTest from 'bun:test';

type Tester = typeof BunTest;
export default Tester;