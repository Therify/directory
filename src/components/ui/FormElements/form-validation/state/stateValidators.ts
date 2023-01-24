export const STATE_VALIDATION_TYPES = {
    REQUIRED: 'required',
} as const;

export type StateValidationType =
    typeof STATE_VALIDATION_TYPES[keyof typeof STATE_VALIDATION_TYPES];

export const createStateValidationErrorMessages = (fieldName?: string) => ({
    [STATE_VALIDATION_TYPES.REQUIRED]: `${fieldName ?? 'State'} is required`,
});

export const getStateValidationErrorMessage = (
    error?: typeof STATE_VALIDATION_TYPES[keyof typeof STATE_VALIDATION_TYPES],
    fieldName?: string
): string | undefined => {
    if (!error) return undefined;
    return createStateValidationErrorMessages(fieldName)[error];
};
