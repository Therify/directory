import * as z from 'zod';

export const ENTRIES = [
    'Individuals',
    'Couples',
    'Families',
    'Groups',
] as const;

export const MAP = {
    INDIVIDUALS: 'Individuals',
    COUPLES: 'Couples',
    FAMILIES: 'Families',
    GROUPS: 'Groups',
} as const;

export const schema = z.enum(ENTRIES);

export type Modality = z.infer<typeof schema>;

export const validate = (value: unknown): Modality => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Modality => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
