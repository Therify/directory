import * as z from 'zod';

export const successSchema = z.object({
    practiceId: z.string(),
    checkoutSessionId: z.string(),
    checkoutSessionUrl: z.string(),
    errors: z.array(z.string()),
});

export const failureSchema = z.object({
    errors: z.array(z.string()),
});

export const schema = z.union([successSchema, failureSchema]);
export type SuccessOutput = z.infer<typeof successSchema>;
export type FailureOutput = z.infer<typeof failureSchema>;
export type Output = SuccessOutput | FailureOutput;

export const validateSuccess = (value: unknown): Output => {
    return successSchema.parse(value);
};
export const validateFailure = (value: unknown): Output => {
    return failureSchema.parse(value);
};

export const isValidSuccess = (value: unknown): value is Output => {
    try {
        validateSuccess(value);
        return true;
    } catch {
        return false;
    }
};

export const isValidFailure = (value: unknown): value is Output => {
    try {
        validateFailure(value);
        return true;
    } catch {
        return false;
    }
};
