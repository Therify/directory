import {
    validatePasswordLength,
    validatePasswordHasNumber,
    validatePasswordHasSpecialCharacter,
    validatePasswordHasLowercase,
    validatePasswordHasUppercase,
    validatePasswordConfirmation,
    PasswordValidationType,
    passwordValidationErrorMessages,
    getPasswordValidationErrorMessage,
} from './passwordValidators';

describe('Password Validation', function () {
    describe('validatePasswordLength', function () {
        test('password length is valid', function () {
            const password = '12345678';
            expect(validatePasswordLength(password)).toBe(true);
        });

        test.each(['1234567', ''])(
            'password length is invalid: %s',
            (password) => {
                expect(validatePasswordLength(password)).toBe(false);
            }
        );
    });

    describe('validatePasswordHasNumber', function () {
        test.each(['0123456789'.split('')])(
            'password is valid: %s',
            (number) => {
                expect(validatePasswordHasNumber(`abc${number}`)).toBe(true);
            }
        );

        test.each(['abc', ''])('password is invalid: %s', (password) => {
            expect(validatePasswordHasNumber(password)).toBe(false);
        });
    });

    describe('validatePasswordHasSpecialCharacter', function () {
        test.each(['!@#$%^&*'.split('')])(
            'password is valid: %s',
            (character) => {
                expect(
                    validatePasswordHasSpecialCharacter(`abc${character}`)
                ).toBe(true);
            }
        );

        test.each(['abc', ''])('password is invalid: %s', (password) => {
            expect(validatePasswordHasSpecialCharacter(password)).toBe(false);
        });
    });

    describe('validatePasswordHasLowercase', function () {
        test.each(['abcdefghijklmnopqrstuvwxyz'.split('')])(
            'password is valid: %s',
            (letter) => {
                expect(validatePasswordHasLowercase(`ABC${letter}`)).toBe(true);
            }
        );

        test.each(['ABC', ''])('password is invalid: %s', (password) => {
            expect(validatePasswordHasLowercase(password)).toBe(false);
        });
    });

    describe('validatePasswordHasUppercase', function () {
        test.each(['ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')])(
            'password is valid: %s',
            (letter) => {
                expect(validatePasswordHasUppercase(`abc${letter}`)).toBe(true);
            }
        );

        test.each(['abc', ''])('password is invalid: %s', (password) => {
            expect(validatePasswordHasUppercase(password)).toBe(false);
        });
    });

    describe('validatePasswordConfirmation', function () {
        test('passwords match', () => {
            expect(validatePasswordConfirmation('12345678', '12345678')).toBe(
                true
            );
        });

        test('passwords do not match', () => {
            expect(validatePasswordConfirmation('12345678', '1234567')).toBe(
                false
            );
        });
    });

    describe('getPasswordValidationErrorMessage', function () {
        test.each([
            PasswordValidationType.Required,
            PasswordValidationType.MinLength,
            PasswordValidationType.SpecialCharacters,
            PasswordValidationType.Number,
            PasswordValidationType.LowerCase,
            PasswordValidationType.UpperCase,
            PasswordValidationType.Confirmation,
        ])('error message for: %s', (validationType) => {
            expect(getPasswordValidationErrorMessage(validationType)).toBe(
                passwordValidationErrorMessages[validationType]
            );
        });

        test('returning undefined', () => {
            expect(getPasswordValidationErrorMessage(undefined)).toBe(
                undefined
            );
        });
    });
});
