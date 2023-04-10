export const INSURANCE_VALIDATION_TYPES = {
    REQUIRED: 'required',
} as const;

export type InsuranceValidationType =
    (typeof INSURANCE_VALIDATION_TYPES)[keyof typeof INSURANCE_VALIDATION_TYPES];

export const createInsuranceValidationErrorMessages = (fieldName?: string) => ({
    [INSURANCE_VALIDATION_TYPES.REQUIRED]: `${
        fieldName ?? 'Insurance'
    } is required`,
});

export const getInsuranceValidationErrorMessage = (
    error?: (typeof INSURANCE_VALIDATION_TYPES)[keyof typeof INSURANCE_VALIDATION_TYPES],
    fieldName?: string
): string | undefined => {
    if (!error) return undefined;
    return createInsuranceValidationErrorMessages(fieldName)[error];
};
