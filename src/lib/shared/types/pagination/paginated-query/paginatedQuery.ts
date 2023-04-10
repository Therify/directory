import * as z from 'zod';

export const schema = z.object({
    offsetId: z.union([z.string(), z.undefined()]).optional(),
    limit: z.number().optional(),
});

export type PaginatedQuery = z.infer<typeof schema>;

export const validate = (value: unknown): PaginatedQuery => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is PaginatedQuery => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
