import { generateWithConfig } from './generateWithConfig';

describe('generateWithConfig', function () {
    it('should return a function', function () {
        const withConfig = generateWithConfig(() => ({}));
        expect(withConfig).toBeInstanceOf(Function);
    });
    test('generated function should pass config to the provided function', function () {
        const config = { foo: 'bar' };
        const withConfig = generateWithConfig(() => config);
        const fn = jest.fn();
        withConfig(fn);
        expect(fn).toHaveBeenCalledWith(config);
    });
});
