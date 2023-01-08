import * as z from 'zod';

export const schema = z.object({
    city: z.string(),
    country: z.string(),
    line1: z.string(),
    line2: z.string(),
    postal_code: z.string(),
    state: z.string(),
});

export type Address = z.infer<typeof schema>;

export const validate = (value: unknown): Address => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Address => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
