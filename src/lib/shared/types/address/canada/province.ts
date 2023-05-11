import * as z from 'zod';
export const ENTRIES = ['Alberta', 'British Columbia', 'Ontario'] as const;

export const MAP = {
    ALBERTA: 'Alberta',
    BRITISH_COLUMBIA: 'British Columbia',
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
