import * as adaptUserIdentifier from './adaptUserIdentifier';

describe('adaptUserIdentifier', () => {
    test('`makeStreamChatSafe` should remove "auth0|" from the beginning of the string', () => {
        const userIdentifier = 'auth0|1234567890';
        const expected = '1234567890';
        const actual = adaptUserIdentifier.makeStreamChatSafe(userIdentifier);
        expect(actual).toBe(expected);
    });
    test('`fromStreamChat` should add "auth0|" to the beginning of the string', () => {
        const userIdentifier = '1234567890';
        const expected = 'auth0|1234567890';
        const actual = adaptUserIdentifier.fromStreamChat(userIdentifier);
        expect(actual).toBe(expected);
    });
    test('`makeManySafe` should remove "auth0|" from the beginning of each string in the array', () => {
        const userIdentifiers = ['auth0|1234567890', 'auth0|0987654321'];
        const expected = ['1234567890', '0987654321'];
        const actual = adaptUserIdentifier.makeManySafe(userIdentifiers);
        expect(actual).toEqual(expected);
    });
    test('`fromMany` should add "auth0|" to the beginning of each string in the array', () => {
        const userIdentifiers = ['1234567890', '0987654321'];
        const expected = ['auth0|1234567890', 'auth0|0987654321'];
        const actual = adaptUserIdentifier.fromMany(userIdentifiers);
        expect(actual).toEqual(expected);
    });
});
