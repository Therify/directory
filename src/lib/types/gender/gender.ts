import * as z from 'zod';

export const schema = z.enum(['Female', 'Male', 'Non-Binary']);

export type Gender = z.infer<typeof schema>;

export const validate = (value: unknown): Gender => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Gender => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
