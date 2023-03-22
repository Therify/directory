import * as z from 'zod';
export const ENTRIES = ['Alberta', 'Ontario'] as const;

export const MAP = {
    ALBERTA: 'Alberta',
    ONTARIO: 'Ontario',
} as const;

export const schema = z.enum(ENTRIES);

export type Province = z.infer<typeof schema>;

export const validate = (value: unknown): Province => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Province => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
