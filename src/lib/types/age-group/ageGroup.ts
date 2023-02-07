import * as z from 'zod';

export const ENTRIES = [
    'Children',
    'Adolescents',
    'Teens',
    'Adults',
    'Seniors',
] as const;

export const MAP = {
    CHILDREN: 'Children',
    ADOLESCENTS: 'Adolescents',
    TEENS: 'Teens',
    ADULTS: 'Adults',
    SENIORS: 'Seniors',
} as const;

export const schema = z.enum(ENTRIES);

export type AgeGroup = z.infer<typeof schema>;

export const validate = (value: unknown): AgeGroup => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is AgeGroup => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
