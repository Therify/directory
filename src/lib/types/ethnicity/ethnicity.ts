import * as z from 'zod';

export const schema = z.enum([
    'American Indian',
    'Black or African American',
    'East Asian',
    'Hispanic, Latino, or of Spanish origin',
    'Middle Eastern',
    'Pacific Islander',
    'South Asian',
    'Southeast Asian',
    'White',
]);

export type Ethnicity = z.infer<typeof schema>;

export const validate = (value: unknown): Ethnicity => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Ethnicity => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
