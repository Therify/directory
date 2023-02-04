import * as z from 'zod';

export const schema = z.object({
    id: z.string(),
    title: z.string(),
    type: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    last_submission: z.string().nullable(),
    url: z.string(),
});

export type Form = z.infer<typeof schema>;

export const validate = (value: unknown): Form => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Form => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
