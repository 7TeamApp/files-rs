import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    transform: {
        '^.+.ts?$': ['ts-jest', { useESM: true }]
    },
    extensionsToTreatAsEsm: ['.ts', '.tsm', '.tsx']
};

export default config;
