import * as z from 'zod';

export const schema = z
    .object({
        emailAddress: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
        hasAcceptedTermsAndConditions: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type CreateUser = z.infer<typeof schema>;

export const validate = (value: unknown): CreateUser => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is CreateUser => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
