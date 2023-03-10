import nextJest from 'next/jest';
import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
    dir: './',
});
const esModules = ['firebase', '@firebase'].join('|');

const CONFIG: Config = {
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>/src',
        }),
        firebase: '<rootDir>/src/lib/shared/utils/test-utils/firebaseMock.ts',
    },
    testPathIgnorePatterns: [
        '<rootDir>/.next/',
        '<rootDir>/node_modules/',
        '<rootDir>/e2e/',
    ],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};

export default createJestConfig(CONFIG);
