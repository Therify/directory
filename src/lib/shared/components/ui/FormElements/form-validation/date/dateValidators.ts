import { isValid, isAfter, isBefore, subYears } from 'date-fns';

export const validateDateIsValid = (date: string | Date) => {
    return isValid(new Date(date));
};

export const validateMinimumDate = (date: Date, minimumDate: Date) => {
    return isAfter(date, minimumDate);
};

export const validateIsFutureDate = (date: Date) => {
    return validateMinimumDate(date, new Date());
};

export const validateIsPastDate = (date: Date) => {
    return isBefore(date, new Date());
};

export const validateMaximumDate = (date: Date, maximumDate: Date) => {
    return isBefore(date, maximumDate);
};

export const validateMinimumAge = (date: Date, minimumAge: number) => {
    const minimumDate = subYears(new Date(), minimumAge);
    return isBefore(date, minimumDate);
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
