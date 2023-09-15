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

export const PHONE_NUMBER_FORMAT = {
    US: 'US',
} as const;

export type PhoneNumberFormat =
    (typeof PHONE_NUMBER_FORMAT)[keyof typeof PHONE_NUMBER_FORMAT];
export const cleanPhoneNumber = (phoneNumber: string) =>
    phoneNumber.replace(/\D/g, '');
export const formatPhoneNumber = (
    phoneNumber: string,
    format?: PhoneNumberFormat
): string => {
    const cleaned = cleanPhoneNumber(phoneNumber);
    switch (format) {
        case PHONE_NUMBER_FORMAT.US:
        default:
            const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
    }
    return phoneNumber;
};
