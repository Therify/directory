import {
    getNumberValidationErrorMessage,
    NumberValidationType,
    createNumberValidationErrorMessages,
} from './numberValidators';

describe('Name Validation', function () {
    describe('getNameValidationErrorMessage', function () {
        const errorMessages = createNumberValidationErrorMessages();

        describe('createNameValidationErrorMessages', () => {
            test('uses fieldName if provided', () => {
                const fieldName = 'First Name';
                const errorMessages =
                    createNumberValidationErrorMessages(fieldName);
                expect(errorMessages[NumberValidationType.Required]).toBe(
                    `${fieldName} is required`
                );
            });

            test('uses default fieldName if not provided', () => {
                const errorMessages = createNumberValidationErrorMessages();
                expect(errorMessages[NumberValidationType.Required]).toBe(
                    'Number is required'
                );
            });
        });

        test('name is required', function () {
            expect(
                getNumberValidationErrorMessage(NumberValidationType.Required)
            ).toBe(errorMessages.required);
        });

        test('returning undefined', function () {
            expect(getNumberValidationErrorMessage(undefined)).toBe(undefined);
        });
    });
});
