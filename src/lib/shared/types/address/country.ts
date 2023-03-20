import * as z from 'zod';
export const ENTRIES = ['CA', 'US'] as const;

export const MAP = {
    CANADA: 'CA',
    UNITED_STATES: 'US',
} as const;

export const schema = z.enum(ENTRIES);

export type Country = z.infer<typeof schema>;

export const validate = (value: unknown): Country => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Country => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
