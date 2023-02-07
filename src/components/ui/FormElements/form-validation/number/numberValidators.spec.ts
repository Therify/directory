import {
    getNameValidationErrorMessage,
    NameValidationType,
    createNameValidationErrorMessages,
} from './numberValidators';

describe('Name Validation', function () {
    describe('getNameValidationErrorMessage', function () {
        const errorMessages = createNameValidationErrorMessages();

        describe('createNameValidationErrorMessages', () => {
            test('uses fieldName if provided', () => {
                const fieldName = 'First Name';
                const errorMessages =
                    createNameValidationErrorMessages(fieldName);
                expect(errorMessages[NameValidationType.Required]).toBe(
                    `${fieldName} is required`
                );
            });

            test('uses default fieldName if not provided', () => {
                const errorMessages = createNameValidationErrorMessages();
                expect(errorMessages[NameValidationType.Required]).toBe(
                    'Name is required'
                );
            });
        });

        test('name is required', function () {
            expect(
                getNameValidationErrorMessage(NameValidationType.Required)
            ).toBe(errorMessages.required);
        });

        test('returning undefined', function () {
            expect(getNameValidationErrorMessage(undefined)).toBe(undefined);
        });
    });
});
