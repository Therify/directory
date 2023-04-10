import * as z from 'zod';

export const schema = z.tuple([z.literal('Other'), z.string()]);

export type Other = z.infer<typeof schema>;

export const validate = (value: unknown): Other => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Other => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
