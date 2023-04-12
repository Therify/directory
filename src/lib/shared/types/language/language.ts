import * as z from 'zod';

export const ENTRIES = [
    'Akan',
    'Arabic',
    'Armenian',
    'ASL, American Sign Language',
    'Bantu/Swahili',
    'Bengali',
    'Black English, Ebonics',
    'Bosnian',
    'Cantonese',
    'Croatian',
    'Dutch',
    'English',
    'French',
    'German',
    'Greek',
    'Gujarati',
    'Haitian Creole',
    'Hebrew',
    'Hindi',
    'Hmong',
    'Hungarian',
    'Indonesian',
    'Italian',
    'Japanese',
    'Khmer',
    'Korean',
    'Mandarin',
    'Mongolian',
    'Navajo',
    'Pashto',
    'Persian/Farsi/Dari',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Romanian',
    'Russian',
    'Serbian',
    'Sinhalese',
    'Spanish',
    'Swedish',
    'Tagalog/Filipino',
    'Tai-Kadai/Thai/Lao',
    'Tamil',
    'Telugu',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Vietnamese',
    'Yiddish',
    'Yoruba',
] as const;

export const MAP = {
    AKAN: 'Akan',
    ARABIC: 'Arabic',
    ARMENIAN: 'Armenian',
    ASL_AMERICAN_SIGN_LANGUAGE: 'ASL, American Sign Language',
    BANTU_SWAHILI: 'Bantu/Swahili',
    BENGALI: 'Bengali',
    BLACK_ENGLISH_EBONICS: 'Black English, Ebonics',
    BOSNIAN: 'Bosnian',
    CANTONESE: 'Cantonese',
    CROATIAN: 'Croatian',
    DUTCH: 'Dutch',
    ENGLISH: 'English',
    FRENCH: 'French',
    GERMAN: 'German',
    GREEK: 'Greek',
    GUJARATI: 'Gujarati',
    HAITIAN_CREOLE: 'Haitian Creole',
    HEBREW: 'Hebrew',
    HINDI: 'Hindi',
    HMONG: 'Hmong',
    HUNGARIAN: 'Hungarian',
    INDONESIAN: 'Indonesian',
    ITALIAN: 'Italian',
    JAPANESE: 'Japanese',
    KHMER: 'Khmer',
    KOREAN: 'Korean',
    MANDARIN: 'Mandarin',
    MONGOLIAN: 'Mongolian',
    NAVAJO: 'Navajo',
    PASHTO: 'Pashto',
    PERSIAN_FARSI_DARI: 'Persian/Farsi/Dari',
    POLISH: 'Polish',
    PORTUGUESE: 'Portuguese',
    PUNJABI: 'Punjabi',
    ROMANIAN: 'Romanian',
    RUSSIAN: 'Russian',
    SERBIAN: 'Serbian',
    SINHALESE: 'Sinhalese',
    SPANISH: 'Spanish',
    SWEDISH: 'Swedish',
    TAGALOG_FILIPINO: 'Tagalog/Filipino',
    TAI_KADAI_THAI_LAO: 'Tai-Kadai/Thai/Lao',
    TAMIL: 'Tamil',
    TELUGU: 'Telugu',
    TURKISH: 'Turkish',
    UKRAINIAN: 'Ukrainian',
    URDU: 'Urdu',
    VIETNAMESE: 'Vietnamese',
    YIDDISH: 'Yiddish',
    YORUBA: 'Yoruba',
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
