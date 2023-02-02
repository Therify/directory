import { asSelectOptions } from './asSelectOptions';

describe('asSelectOptions', () => {
    it('should return an array of SelectOption objects', () => {
        const entries = ['one', 'two', 'three'];
        const result = asSelectOptions(entries);
        expect(result).toEqual([
            { displayText: 'one', value: 'one' },
            { displayText: 'two', value: 'two' },
            { displayText: 'three', value: 'three' },
        ]);
    });
});
