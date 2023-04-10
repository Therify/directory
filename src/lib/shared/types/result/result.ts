import * as z from 'zod';

export const successSchema = z.object({
    success: z.literal(true),
    payload: z.unknown(),
});

export const failureSchema = z.object({
    success: z.literal(false),
    error: z.unknown(),
});

export const schema = z.union([successSchema, failureSchema]);

export type Result = z.infer<typeof schema>;

export const validate = (value: unknown): Result => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Result => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
