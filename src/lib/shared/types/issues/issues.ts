import * as z from 'zod';

export const ENTRIES = [
    'Addiction',
    'ADHD',
    'Anger',
    'Anxiety',
    'Bipolar Disorder',
    'Care Giving',
    'Child or Adolescent Issues',
    'Depression',
    'Domestic Abuse',
    'Family Issues',
    'Gender or Sexual Identity',
    'Grief and Loss',
    'LGBTQ+ Issues',
    'Life Transitions',
    "Men's Issues",
    'Neurodivergence',
    'Parenting',
    'Pregnancy, Prenatal, or Postpartum Issues',
    'Racial Identity',
    'Racism or Microaggression',
    'Relationship or Marital Issues',
    'Sexual Abuse/Trauma',
    'Self-Esteem',
    'Stress',
    'Trauma or PTSD',
    "Women's Issues",
] as const;

export const schema = z.enum(ENTRIES);

export type Issue = z.infer<typeof schema>;

export const validate = (value: unknown): Issue => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Issue => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
