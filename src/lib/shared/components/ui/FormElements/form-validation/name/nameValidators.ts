export const enum NameValidationType {
    Required = 'required',
}

export const createNameValidationErrorMessages = (fieldName?: string) => ({
    [NameValidationType.Required]: `${fieldName ?? 'Name'} is required`,
});

export const getNameValidationErrorMessage = (
    error?: NameValidationType,
    fieldName?: string
): string | undefined => {
    if (!error) return undefined;
    return createNameValidationErrorMessages(fieldName)[error];
};
