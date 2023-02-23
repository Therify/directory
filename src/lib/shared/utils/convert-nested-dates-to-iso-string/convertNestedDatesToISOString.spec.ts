import { convertNestedDatesToISOString } from './convertNestedDatesToISOString';

describe('convertNestedDatesToISOString', () => {
    it('converts nested dates to ISO string', () => {
        const testDate = new Date();
        expect(
            convertNestedDatesToISOString({ nest: { nest2: { testDate } } })
        ).toEqual({ nest: { nest2: { testDate: testDate.toISOString() } } });
    });

    it('converts dates to ISO string', () => {
        const testDate = new Date();
        expect(convertNestedDatesToISOString(testDate)).toBe(
            testDate.toISOString()
        );
    });

    it('converts dates in arrays to ISO string', () => {
        const testDate = new Date();
        expect(
            convertNestedDatesToISOString({ testDate: [1, testDate, 2] })
        ).toEqual({ testDate: [1, testDate.toISOString(), 2] });
    });

    it('should handle null', () => {
        expect(convertNestedDatesToISOString(null)).toBe(null);
    });

    it('ignores non date values', () => {
        const testObject = {
            number: 1,
            string: 'Hello World',
            boolean: true,
            undefined: undefined,
            null: null,
        };
        expect(convertNestedDatesToISOString(testObject)).toEqual(testObject);
    });
});
