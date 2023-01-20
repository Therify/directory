export const enum URLValidationType {
    Required = 'required',
    ValidUrl = 'validUrl',
}

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export const createUrlValidationErrorMessages = (fieldName?: string) => {
    fieldName = fieldName ?? 'Url';
    return {
        [URLValidationType.Required]: `${fieldName} is required`,
        [URLValidationType.ValidUrl]: `${fieldName} must be a valid URL. Be sure to include http:// or https://`,
    };
};

export const getUrlValidationErrorMessage = (
    error?: URLValidationType,
    fieldName?: string
): string | undefined => {
    if (!error) return undefined;
    return createUrlValidationErrorMessages(fieldName)[error];
};
