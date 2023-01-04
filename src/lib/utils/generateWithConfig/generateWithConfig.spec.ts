import { generateWithConfig } from './generateWithConfig';

describe('generateWithConfig', () => {
    it('given a config getter, return a function that supplies expected config', function () {
        const mockConfigGetter = (overrides: any) => ({
            foo: 'bar',
            ...overrides,
        });
        const withConfiguration = generateWithConfig(mockConfigGetter);
        withConfiguration(function (config) {
            expect(config.foo).toEqual('bar');
        });
    });
    it('applies overrides', function () {
        const mockConfigGetter = (overrides: any) => ({
            foo: 'bar',
            ...overrides,
        });
        const withConfiguration = generateWithConfig(mockConfigGetter);
        withConfiguration(
            function (config) {
                expect(config.foo).toEqual('baz');
            },
            { foo: 'baz' }
        );
    });
});
