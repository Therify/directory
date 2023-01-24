export const enum PhoneValidationType {
    Required = 'required',
    ValidLength = 'validLength',
    IsNumeric = 'isNumeric',
}
const defaultLength = 10;

export const isValidLength = (phone: string, length?: number): boolean => {
    return phone.length === (length ?? defaultLength);
};

export const isNumeric = (phone: string): boolean => {
    return /^\d+$/.test(phone);
};

export const createPhoneValidationErrorMessages = (
    fieldName?: string,
    length?: number
) => {
    fieldName = fieldName ?? 'Phone number';
    return {
        [PhoneValidationType.Required]: `${fieldName} is required`,
        [PhoneValidationType.ValidLength]: `${fieldName} must be ${
            length ?? defaultLength
        } digits long`,
        [PhoneValidationType.IsNumeric]: `${fieldName} must be only use numbers`,
    };
};

export const getPhoneValidationErrorMessage = (
    error?: PhoneValidationType,
    { fieldName, length }: { fieldName?: string; length?: number } = {}
): string | undefined => {
    if (!error) return undefined;
    return createPhoneValidationErrorMessages(fieldName, length)[error];
};
