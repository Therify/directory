export const validatePasswordLength = (password: string): boolean => {
    return password.length >= 8;
};

export const validatePasswordHasNumber = (password: string): boolean => {
    return /\d/.test(password);
};

export const validatePasswordHasSpecialCharacter = (
    password: string
): boolean => {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
};

export const validatePasswordHasLowercase = (password: string): boolean => {
    return /[a-z]/.test(password);
};

export const validatePasswordHasUppercase = (password: string): boolean => {
    return /[A-Z]/.test(password);
};

export const validatePasswordConfirmation = (
    password: string,
    passwordConfirmation: string
): boolean => password === passwordConfirmation;

export const enum PasswordValidationType {
    Required = 'required',
    MinLength = 'minLength',
    SpecialCharacters = 'specialCharacters',
    Number = 'number',
    LowerCase = 'lowerCase',
    UpperCase = 'upperCase',
    Confirmation = 'confirmation',
}

export const passwordValidationErrorMessages = {
    [PasswordValidationType.Required]: 'Password is required',
    [PasswordValidationType.MinLength]:
        'Password must be at least 8 characters long',
    [PasswordValidationType.SpecialCharacters]:
        'Password must contain a special character (!@#$%^&*)',
    [PasswordValidationType.Number]: 'Password must contain a number (0-9)',
    [PasswordValidationType.LowerCase]:
        'Password must contain a lowercase letter (a-z)',
    [PasswordValidationType.UpperCase]:
        'Password must contain an uppercase letter (A-Z)',
    [PasswordValidationType.Confirmation]: 'Passwords do not match',
};

export const getPasswordValidationErrorMessage = (
    error?: PasswordValidationType
): string | undefined => {
    if (!error) return undefined;
    return passwordValidationErrorMessages[error];
};
