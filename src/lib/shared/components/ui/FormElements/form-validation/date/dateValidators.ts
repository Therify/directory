import { isValid, isAfter, isBefore, subYears } from 'date-fns';

export const validateDateIsValid = (date: string | Date) => {
    return isValid(new Date(date));
};

export const validateMinimumDate = (date: string | Date, minimumDate: Date) => {
    return isAfter(new Date(date), minimumDate);
};

export const validateIsFutureDate = (date: string | Date) => {
    return validateMinimumDate(new Date(date), new Date());
};

export const validateIsPastDate = (date: string | Date) => {
    return isBefore(new Date(date), new Date());
};

export const validateMaximumDate = (date: string | Date, maximumDate: Date) => {
    return isBefore(new Date(date), maximumDate);
};

export const validateMinimumAge = (date: string | Date, minimumAge: number) => {
    const minimumDate = subYears(new Date(), minimumAge);
    return isBefore(new Date(date), minimumDate);
};

export const enum DateValidationType {
    Required = 'required',
    IsValid = 'isValid',
    MinDate = 'minDate',
    MaxDate = 'maxDate',
    MinAge = 'minAge',
    IsFuture = 'isFuture',
    IsPast = 'isPast',
}

interface ErrorOptions {
    fieldName?: string;
    minimumAge?: number;
    minimimDate?: string;
    maximumDate?: string;
}

export const createDateValidationErrorMessages = (options: ErrorOptions) => {
    const {
        fieldName: customFieldName,
        minimumAge,
        minimimDate,
        maximumDate,
    } = options;
    const fieldName = customFieldName ?? 'Date';
    return {
        [DateValidationType.Required]: `${fieldName} is required`,
        [DateValidationType.IsValid]: `${fieldName} is invalid`,
        [DateValidationType.MinDate]: `${fieldName} is before ${
            minimimDate ?? 'the minimum date allowed'
        }`,
        [DateValidationType.MaxDate]: `${fieldName} is after ${
            maximumDate ?? 'the maximum date allowed'
        }`,
        [DateValidationType.MinAge]: `Must be at least ${
            minimumAge ?? 18
        } years old`,
        [DateValidationType.IsFuture]: `${fieldName} must be in the future`,
        [DateValidationType.IsPast]: `${fieldName} must be in the past`,
    };
};

export const getDateValidationErrorMessage = (
    error?: DateValidationType,
    errorOptions?: ErrorOptions
): string | undefined => {
    if (!error) return undefined;
    return createDateValidationErrorMessages(errorOptions ?? {})[error];
};

export const refineIsValidDateOfBirth = (
    input: Date | string,
    path?: string
) => {
    const date = typeof input === 'string' ? new Date(input) : input;
    if (!validateDateIsValid(date)) {
        return {
            message: getDateValidationErrorMessage(DateValidationType.IsValid),
            path,
        };
    }
    validateMinimumAge;
    if (!validateMinimumDate(date, new Date(1900, 0, 1))) {
        return {
            message: getDateValidationErrorMessage(DateValidationType.MinDate),
            path,
        };
    }

    if (!validateIsPastDate(date)) {
        return {
            message: getDateValidationErrorMessage(DateValidationType.IsPast),
            path,
        };
    }

    if (!validateMinimumAge(date, 18)) {
        return {
            message: getDateValidationErrorMessage(DateValidationType.MinAge),
            path,
        };
    }
};
