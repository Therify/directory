import {
    getPhoneValidationErrorMessage,
    PhoneValidationType,
    createPhoneValidationErrorMessages,
    isNumeric,
    isValidLength,
} from './phoneValidators';

describe('Phone number Validation', function () {
    describe('getPhoneValidationErrorMessage', function () {
        const errorMessages = createPhoneValidationErrorMessages();

        describe('createPhoneValidationErrorMessages', () => {
            test('uses fieldName if provided', () => {
                const fieldName = 'Test Name';
                const errorMessages =
                    createPhoneValidationErrorMessages(fieldName);
                expect(errorMessages[PhoneValidationType.Required]).toBe(
                    `${fieldName} is required`
                );
            });

            test('uses default fieldName if not provided', () => {
                const errorMessages = createPhoneValidationErrorMessages();
                expect(errorMessages[PhoneValidationType.Required]).toBe(
                    'Phone number is required'
                );
            });
            test('uses default length if not provided', () => {
                const errorMessages = createPhoneValidationErrorMessages();
                expect(errorMessages[PhoneValidationType.ValidLength]).toBe(
                    'Phone number must be 10 digits long'
                );
            });
        });

        test('phone number is required', function () {
            expect(
                getPhoneValidationErrorMessage(PhoneValidationType.Required)
            ).toBe(errorMessages.required);
        });

        test('length', function () {
            expect(
                getPhoneValidationErrorMessage(PhoneValidationType.ValidLength)
            ).toBe(errorMessages.validLength);
        });

        test('uses provided length', () => {
            const errorMessages = createPhoneValidationErrorMessages(
                undefined,
                5
            );
            expect(errorMessages[PhoneValidationType.ValidLength]).toBe(
                'Phone number must be 5 digits long'
            );
        });

        test('isNumeric', function () {
            expect(
                getPhoneValidationErrorMessage(PhoneValidationType.IsNumeric)
            ).toBe(errorMessages.isNumeric);
        });

        test('returning undefined', function () {
            expect(getPhoneValidationErrorMessage(undefined)).toBe(undefined);
        });
    });

    describe('Validators', () => {
        describe('isNumeric', () => {
            test('returns true if only numbers', () => {
                expect(isNumeric('1234567890')).toBe(true);
            });

            test('returns false if not only numbers', () => {
                expect(isNumeric('1234567890a')).toBe(false);
            });
        });

        describe('isValidLength', () => {
            test('returns true if length is 10', () => {
                expect(isValidLength('1234567890')).toBe(true);
            });

            test('returns false if length is not 10', () => {
                expect(isValidLength('1234567890a')).toBe(false);
            });

            test('handles custom length', () => {
                expect(isValidLength('1234567890', 5)).toBe(false);
                expect(isValidLength('12345', 5)).toBe(true);
            });
        });
    });
});
