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
    'Suicidal Ideation',
    'Trauma or PTSD',
    "Women's Issues",
] as const;

export const MAP = {
    ADDICTION: 'Addiction',
    ADHD: 'ADHD',
    ANGER: 'Anger',
    ANXIETY: 'Anxiety',
    BIPOLAR_DISORDER: 'Bipolar Disorder',
    CARE_GIVING: 'Care Giving',
    CHILD_OR_ADOLESCENT_ISSUES: 'Child or Adolescent Issues',
    DEPRESSION: 'Depression',
    DOMESTIC_ABUSE: 'Domestic Abuse',
    FAMILY_ISSUES: 'Family Issues',
    GENDER_OR_SEXUAL_IDENTITY: 'Gender or Sexual Identity',
    GRIEF_AND_LOSS: 'Grief and Loss',
    LGBTQ_PLUS_ISSUES: 'LGBTQ+ Issues',
    LIFE_TRANSITIONS: 'Life Transitions',
    MENS_ISSUES: "Men's Issues",
    NEURODIVERGENCE: 'Neurodivergence',
    PARENTING: 'Parenting',
    PREGNANCY_PRENATAL_OR_POSTPARTUM_ISSUES:
        'Pregnancy, Prenatal, or Postpartum Issues',
    RACIAL_IDENTITY: 'Racial Identity',
    RACISM_OR_MICROAGGRESSION: 'Racism or Microaggression',
    RELATIONSHIP_OR_MARITAL_ISSUES: 'Relationship or Marital Issues',
    SEXUAL_ABUSE_TRAUMA: 'Sexual Abuse/Trauma',
    SELF_ESTEEM: 'Self-Esteem',
    STRESS: 'Stress',
    SUICIDAL_IDEATION: 'Suicidal Ideation',
    TRAUMA_OR_PSTD: 'Trauma or PTSD',
    WOMENS_ISSUES: "Women's Issues",
} as const;

export const schema = z.enum(ENTRIES);

export type AreaOfFocus = z.infer<typeof schema>;

export const validate = (value: unknown): AreaOfFocus => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is AreaOfFocus => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
