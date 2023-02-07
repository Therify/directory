import * as z from 'zod';

export const ENTRIES = [
    'Blind Allied',
    'Body Positivity',
    'Cancer Affected',
    'Deaf Allied',
    'Gay Allied',
    'HIV / AIDS Allied',
    'Immigrants',
    'Immuno-disorders',
    'Intersex Allied',
    'Lesbian Allied',
    'Little Person Allied',
    'Non-Binary Allied',
    'Open Relationships Non-Monogamy',
    'Queer Allied',
    'Racial Justice Allied',
    'Sex Worker Allied',
    'Sex-Positive, Kink Allied',
    'Single Parent',
    'Transgender Allied',
    'Vegan Allied',
    'Veterans',
] as const;

export const MAP = {
    BLIND_ALLIED: 'Blind Allied',
    BODY_POSITIVITY: 'Body Positivity',
    CANCER_AFFECTED: 'Cancer Affected',
    DEAF_ALLIED: 'Deaf Allied',
    GAY_ALLIED: 'Gay Allied',
    HIV_AIDS_ALLIED: 'HIV / AIDS Allied',
    IMMIGARNAT: 'Immigrants',
    IMMUNO_DISORDERED: 'Immuno-disorders',
    INTERSEX_ALLIED: 'Intersex Allied',
    LESBIAN_ALLIED: 'Lesbian Allied',
    LITTLE_PERSON_ALLIED: 'Little Person Allied',
    NON_BINARY_ALLIED: 'Non-Binary Allied',
    OPEN_RELATIONSHIP_NON_MONOGAMY: 'Open Relationships Non-Monogamy',
    QUEER_ALLIED: 'Queer Allied',
    RACIAL_JUSTICE_ALLIED: 'Racial Justice Allied',
    SEX_WORKER_ALLIED: 'Sex Worker Allied',
    SEX_POSITIVE_KINK_ALLIED: 'Sex-Positive, Kink Allied',
    SINGLE_PARENT: 'Single Parent',
    TRANSGENDER_ALLIED: 'Transgender Allied',
    VEGAN_ALLIED: 'Vegan Allied',
    VETERANS: 'Veterans',
} as const;

export const schema = z.enum(ENTRIES);

export type CommunitiesServed = z.infer<typeof schema>;

export const validate = (value: unknown): CommunitiesServed => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is CommunitiesServed => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
