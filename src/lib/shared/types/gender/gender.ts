import * as z from 'zod';

export const ENTRIES = [
    'Female',
    'Male',
    'Non-Binary',
    'Prefer not to say',
] as const;

export const MAP = {
    FEMALE: ENTRIES[0],
    MALE: ENTRIES[1],
    NON_BINARY: ENTRIES[2],
    PREFER_NOT_TO_SAY: ENTRIES[3],
} as const;

export const schema = z.enum(ENTRIES);
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
