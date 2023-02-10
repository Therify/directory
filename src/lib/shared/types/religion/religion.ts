import * as z from 'zod';

export const ENTRIES = [
    'Buddhist',
    'Christian',
    'Church of Jesus Christ of Latter Day Saints',
    'Hindu',
    'Jewish',
    'Muslim',
    'Sikh',
] as const;

export const MAP = {
    BUDDHIST: ENTRIES[0],
    CHRISTIAN: ENTRIES[1],
    CHURCH_OF_JESUS_CHRIST_OF_LATTER_DAY_SAINTS: ENTRIES[2],
    HINDU: ENTRIES[3],
    JEWISH: ENTRIES[4],
    MUSLIM: ENTRIES[5],
    SIKH: ENTRIES[6],
} as const;

export const schema = z.enum(ENTRIES);

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
