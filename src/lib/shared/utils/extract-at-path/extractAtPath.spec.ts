import { extractAtPath } from './index';

describe('extractAtPath()', function () {
    it("given a 'path' to a value, should return the value", function () {
        const obj = {
            a: {
                b: {
                    c: 'value',
                },
            },
        };
        const path = 'a.b.c';
        const result = extractAtPath(obj, path);
        expect(result).toBe('value');
    });
});
