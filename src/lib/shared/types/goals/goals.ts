import * as z from 'zod';

export const ENTRIES = [
    'Stress Management',
    'Anxiety Management',
    'Reduce Depression',
    'Career Development',
    'Resolve Relationship/Family Issues',
    'LGBTQ+ Issues',
    'Build Confidence',
    'Anger Management',
] as const;

export const schema = z.enum(ENTRIES);

export type Goal = z.infer<typeof schema>;

export const validate = (value: unknown): Goal => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Goal => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
