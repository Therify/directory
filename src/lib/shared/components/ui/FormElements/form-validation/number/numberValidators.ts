export const enum NumberValidationType {
    Required = 'required',
    GreaterThan = 'min',
    LessThan = 'max',
    GreaterThanOrEqual = 'greaterThanOrEqual',
    LessThanOrEqual = 'lessThanOrEqual',
    Equal = 'equal',
    NotEqual = 'notEqual',
}

export const isGreaterThan = (value: number, threshold: number): boolean =>
    value > threshold;

export const isLessThan = (value: number, threshold: number): boolean =>
    value < threshold;

export const isGreaterThanOrEqual = (
    value: number,
    threshold: number
): boolean => value >= threshold;

export const isLessThanOrEqual = (value: number, threshold: number): boolean =>
    value <= threshold;

export const isEqual = (value: number, number: number): boolean =>
    value === number;

export const isNotEqual = (value: number, number: number): boolean =>
    value !== number;

interface NumberErrorMessageOptions {
    greaterThanThreshold?: number;
    lessThanThreshold?: number;
    greaterThanOrEqualThreshold?: number;
    lessThanOrEqualThreshold?: number;
    equalNumber?: number;
    notEqualNumber?: number;
}
export const createNumberValidationErrorMessages = (
    fieldName?: string,
    options?: NumberErrorMessageOptions
) => ({
    [NumberValidationType.Required]: `${fieldName ?? 'Number'} is required`,
    [NumberValidationType.GreaterThan]: `${
        fieldName ?? 'Number'
    } must be greater than ${options?.greaterThanThreshold ?? 'this number'}`,
    [NumberValidationType.LessThan]: `${
        fieldName ?? 'Number'
    } must be less than ${options?.lessThanOrEqualThreshold ?? 'this number'}`,
    [NumberValidationType.GreaterThanOrEqual]: `${
        fieldName ?? 'Number'
    } must be greater than or equal to ${
        options?.greaterThanThreshold ?? 'this number'
    }`,
    [NumberValidationType.LessThanOrEqual]: `${
        fieldName ?? 'Number'
    } must be less than or equal to ${
        options?.lessThanOrEqualThreshold ?? 'this number'
    }`,
    [NumberValidationType.Equal]: `${fieldName ?? 'Number'} must be equal to ${
        options?.equalNumber ?? 'this number'
    }`,
    [NumberValidationType.NotEqual]: `${
        fieldName ?? 'Number'
    } must not be equal to ${options?.notEqualNumber ?? 'this number'}`,
});

export const getNumberValidationErrorMessage = (
    error?: NumberValidationType,
    options?: { fieldName?: string } & NumberErrorMessageOptions
): string | undefined => {
    const { fieldName, ...errorMessageOptions } = options ?? {};
    if (!error) return undefined;
    return createNumberValidationErrorMessages(fieldName, errorMessageOptions)[
        error
    ];
};
