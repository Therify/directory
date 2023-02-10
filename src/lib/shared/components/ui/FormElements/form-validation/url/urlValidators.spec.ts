import {
    getUrlValidationErrorMessage,
    URLValidationType,
    createUrlValidationErrorMessages,
    isValidUrl,
} from './urlValidators';

describe('Url Validation', function () {
    describe('getUrlValidationErrorMessage', function () {
        const errorMessages = createUrlValidationErrorMessages();

        describe('createUrlValidationErrorMessages', () => {
            test('uses fieldName if provided', () => {
                const fieldName = 'Test Name';
                const errorMessages =
                    createUrlValidationErrorMessages(fieldName);
                expect(errorMessages[URLValidationType.Required]).toBe(
                    `${fieldName} is required`
                );
            });

            test('uses default fieldName if not provided', () => {
                const errorMessages = createUrlValidationErrorMessages();
                expect(errorMessages[URLValidationType.Required]).toBe(
                    'Url is required'
                );
            });
        });

        test('url is required', function () {
            expect(
                getUrlValidationErrorMessage(URLValidationType.Required)
            ).toBe(errorMessages.required);
        });

        test('isValid mesage', function () {
            expect(
                getUrlValidationErrorMessage(URLValidationType.ValidUrl)
            ).toBe(errorMessages.validUrl);
        });

        test('returning undefined', function () {
            expect(getUrlValidationErrorMessage(undefined)).toBe(undefined);
        });
    });

    describe('Validators', () => {
        describe('isValidUrl', () => {
            test('returns true for valid url', () => {
                expect(isValidUrl('http://www.therify.co')).toBe(true);
            });

            test('returns false for invalid url', () => {
                expect(isValidUrl('www.google.com')).toBe(false);
            });
        });
    });
});
