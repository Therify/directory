import * as z from 'zod';

export const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    connection: z.string(),
    verify_email: z.boolean().default(false),
});

export type Input = z.infer<typeof schema>;

export const validate = (value: unknown): Input => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Input => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
