import * as z from 'zod';

export const schema = z.object({
    id: z.string(),
    status: z.string(),
    type: z.string(),
    created_at: z.string().optional(),
});

export type Job = z.infer<typeof schema>;

export const validate = (value: unknown): Job => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Job => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
