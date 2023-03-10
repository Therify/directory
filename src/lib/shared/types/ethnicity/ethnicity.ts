import * as z from 'zod';
export const ENTRIES = [
    'American Indian',
    'Black or African American',
    'East Asian',
    'Hispanic, Latino, or of Spanish origin',
    'Jewish',
    'Middle Eastern',
    'Pacific Islander',
    'South Asian',
    'Southeast Asian',
    'White',
] as const;

export const MAP = {
    AMERICAN_INDIAN: 'American Indian',
    BLACK_OR_AFRICAN_AMERICAN: 'Black or African American',
    EAST_ASIAN: 'East Asian',
    HISPANIC_LATINO_OR_OF_SPANISH_ORIGIN:
        'Hispanic, Latino, or of Spanish origin',
    JEWISH: 'Jewish',
    MIDDLE_EASTERN: 'Middle Eastern',
    PACIFIC_ISLANDER: 'Pacific Islander',
    SOUTH_ASIAN: 'South Asian',
    SOUTHEAST_ASIAN: 'Southeast Asian',
    WHITE: 'White',
} as const;

export const schema = z.enum(ENTRIES);

export type Ethnicity = z.infer<typeof schema>;

export const validate = (value: unknown): Ethnicity => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Ethnicity => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
