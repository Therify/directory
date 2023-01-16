import {
    isMinimumLengthValid,
    GiftCardCodeValidationType,
    getGiftCardRedemptionCodeValidationErrorMessage,
    GiftCardRedemptionCodeValidationErrorMessages,
} from './giftCardCodeValidators';

describe('Gift Card Code Validation', function () {
    describe('minLength', function () {
        test('defaults minimum length to 5', function () {
            expect(isMinimumLengthValid('12345')).toBe(true);
        });

        test('returns true when length is valid', function () {
            expect(isMinimumLengthValid('12345', 5)).toBe(true);
        });

        test('returns false when length too short', () => {
            expect(isMinimumLengthValid('1234', 5)).toBe(false);
        });
    });

    describe('getGiftCardRedemptionCodeValidationErrorMessage', function () {
        test('gift card is required', function () {
            expect(
                getGiftCardRedemptionCodeValidationErrorMessage(
                    GiftCardCodeValidationType.Required
                )
            ).toBe(GiftCardRedemptionCodeValidationErrorMessages.required);
        });
        test('code is too short', function () {
            expect(
                getGiftCardRedemptionCodeValidationErrorMessage(
                    GiftCardCodeValidationType.MinLength
                )
            ).toBe(GiftCardRedemptionCodeValidationErrorMessages.minLength);
        });

        test('returning undefined', function () {
            expect(
                getGiftCardRedemptionCodeValidationErrorMessage(undefined)
            ).toBe(undefined);
        });
    });
});
