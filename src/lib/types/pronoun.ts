import * as z from 'zod';

export const ENTRIES = [
    'he/him/his',
    'she/her/hers',
    'they/them/theirs',
    'he/they',
    'she/they',
] as const;

export const MAP = {
    HE_HIM: ENTRIES[0],
    SHE_HER: ENTRIES[1],
    THEY_THEM: ENTRIES[2],
    HE_THEY: ENTRIES[3],
    SHE_THEY: ENTRIES[4],
} as const;

export const schema = z.enum(ENTRIES);

export type Pronoun = z.infer<typeof schema>;

export const validate = (value: unknown): Pronoun => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Pronoun => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
