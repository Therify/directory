export const isMinimumLengthValid = (
    code: string,
    minLength?: number
): boolean => {
    return code.length >= (minLength ?? 5);
};

export const enum GiftCardCodeValidationType {
    Required = 'required',
    MinLength = 'minLength',
}

export const GiftCardRedemptionCodeValidationErrorMessages = {
    [GiftCardCodeValidationType.Required]: 'Redemption code is required',
    [GiftCardCodeValidationType.MinLength]:
        'Redemption codes are at least 5 characters long',
};

export const getGiftCardRedemptionCodeValidationErrorMessage = (
    error?: GiftCardCodeValidationType
): string | undefined => {
    if (!error) return undefined;
    return GiftCardRedemptionCodeValidationErrorMessages[error];
};
