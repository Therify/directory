import * as z from 'zod';

export const schema = z.enum([
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
]);

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
