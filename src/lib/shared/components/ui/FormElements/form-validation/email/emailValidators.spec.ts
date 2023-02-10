import {
    isValidEmail,
    getEmailValidationErrorMessage,
    EmailValidationType,
    emailValidationErrorMessages,
} from './emailValidators';

describe('Email Validation', function () {
    describe('isValidEmail', function () {
        test('email is valid', function () {
            const email = 'jessie@therify.co';
            expect(isValidEmail(email)).toBe(true);
        });

        test.each([
            '',
            'jessie@therify',
            '@therify.',
            'jessie@therify.',
            'therify.co',
        ])('email is invalid: %s', (email) => {
            expect(isValidEmail(email)).toBe(false);
        });
    });

    describe('getEmailValidationErrorMessage', function () {
        test('email is required', function () {
            expect(
                getEmailValidationErrorMessage(EmailValidationType.Required)
            ).toBe(emailValidationErrorMessages.required);
        });
        test('email is invalid', function () {
            expect(
                getEmailValidationErrorMessage(EmailValidationType.IsValid)
            ).toBe(emailValidationErrorMessages.isValid);
        });

        test('returning undefined', function () {
            expect(getEmailValidationErrorMessage(undefined)).toBe(undefined);
        });
    });
});
