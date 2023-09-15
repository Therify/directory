import { IsEmailUnique } from '@/lib/modules/users/features';

export const isValidEmail = (email: string): boolean => {
    const expression =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(email.toLowerCase());
};

export const enum EmailValidationType {
    IsValid = 'isValid',
    IsUnique = 'isUnique',
    Required = 'required',
}

export const emailValidationErrorMessages = {
    [EmailValidationType.IsValid]: 'Email is invalid',
    [EmailValidationType.IsUnique]: 'Email is already in use',
    [EmailValidationType.Required]: 'Email is required',
};

export const getEmailValidationErrorMessage = (
    error?: EmailValidationType
): string | undefined => {
    if (!error) return undefined;
    return emailValidationErrorMessages[error];
};

export const isUniqueEmailFactory =
    (urlEndpoint: string) =>
    async (email: string): Promise<boolean> => {
        const response = await fetch(`${urlEndpoint}?emailAddress=${email}`);
        const data = IsEmailUnique.outputSchema.parse(await response.json());
        return data.isUnique;
    };
