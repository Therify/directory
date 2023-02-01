import * as z from 'zod';

export const schema = z.enum([
    'Buddhist',
    'Christian',
    'Church of Jesus Christ of Latter Day Saints',
    'Hindu',
    'Jewish',
    'Muslim',
    'Sikh',
]);

export type Religion = z.infer<typeof schema>;

export const validate = (value: unknown): Religion => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Religion => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
