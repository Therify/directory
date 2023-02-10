import * as z from 'zod';

// ? Should the Registration Flow log you in?
export const successSchema = z.object({
    wasSuccessful: z.literal(true),
    userId: z.string(),
    auth0UserId: z.string(),
    errors: z.array(z.string()),
});

export const failureSchema = z.object({
    wasSuccessful: z.literal(false),
    errors: z.array(z.string()),
});

export const schema = z.union([successSchema, failureSchema]);

export type Output =
    | z.infer<typeof successSchema>
    | z.infer<typeof failureSchema>;

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
