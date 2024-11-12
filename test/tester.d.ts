import type {
    afterAll as _afterAll,
    afterEach as _afterEach,
    beforeAll as _beforeAll,
    beforeEach as _beforeEach,
    describe as _describe,
    expect as _expect,
    it as _it,
    jest as _jest,
    mock as _mock,
    setDefaultTimeout as _setDefaultTimeout,
    setSystemTime as _setSystemTime,
    spyOn as _spyOn,
    test as _test
} from 'lib/tester';

declare global {
    const afterAll: typeof _afterAll;
    const afterEach: typeof _afterEach;
    const beforeAll: typeof _beforeAll;
    const beforeEach: typeof _beforeEach;
    const describe: typeof _describe;
    const expect: typeof _expect;
    const it: typeof _it;
    const jest: typeof _jest;
    const mock: typeof _mock;
    const setDefaultTimeout: typeof _setDefaultTimeout;
    const setSystemTime: typeof _setSystemTime;
    const spyOn: typeof _spyOn;
    const test: typeof _test;
}
