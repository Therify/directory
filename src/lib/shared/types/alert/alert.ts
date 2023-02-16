import * as z from 'zod';

export const schema = z.object({
    id: z.string(),
    title: z.string(),
    message: z.string(),
    requireInteraction: z.boolean().optional(),
});

export type Type = z.infer<typeof schema>;

export const validate = (value: unknown): Type => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
