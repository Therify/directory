import * as z from 'zod';

export const schema = z.object({
    offsetId: z.union([z.string(), z.number()]).optional(),
    count: z.number().default(0),
    items: z.array(z.unknown()).default([]),
});

export type PaginatedResponse = z.infer<typeof schema>;

export const validate = (value: unknown): PaginatedResponse => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is PaginatedResponse => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
