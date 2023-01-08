import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.e2e.json';

const CONFIG: Config = {
    displayName: 'e2e',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../src/',
    }),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default CONFIG;
