import * as z from 'zod';

export const ENTRIES = [
    'Arabic',
    'Cantonese',
    'French',
    'German',
    'English',
    'Hebrew',
    'Italian',
    'Japanese',
    'Korean',
    'Mandarin',
    'Punjabi',
    'Russian',
    'Spanish',
    'Urdu',
    'Vietnamese',
] as const;

export const MAP = {
    ARABIC: ENTRIES[0],
    CANTONESE: ENTRIES[1],
    FRENCH: ENTRIES[2],
    GERMAN: ENTRIES[3],
    ENGLISH: ENTRIES[4],
    HEBREW: ENTRIES[5],
    ITALIAN: ENTRIES[6],
    JAPANESE: ENTRIES[7],
    KOREAN: ENTRIES[8],
    MANDARIN: ENTRIES[9],
    PUNJABI: ENTRIES[10],
    RUSSIAN: ENTRIES[11],
    SPANISH: ENTRIES[12],
    URDU: ENTRIES[13],
    VIETNAMESE: ENTRIES[14],
} as const;

export const schema = z.enum(ENTRIES);

export type Language = z.infer<typeof schema>;

export const validate = (value: unknown): Language => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Language => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
