import * as z from 'zod';

export const ENTRIES = [
    'Acceptance and Commitment Therapy',
    'Applied Behavior Analysis',
    'Assertive Community Treatment',
    'Behavioral Activation',
    'Cognitive Behavioral Therapy',
    'Dialectical Behavior Therapy',
    'Exposure Therapy',
    'Functional Family Therapy',
    'Interpersonal Therapy',
    'Motivational Interviewing',
    'Prolonged Exposure Therapy',
    'Compassion-Focused Therapy',
] as const;

export const schema = z.enum(ENTRIES);

export type EvidenceBasedApproach = z.infer<typeof schema>;

export const validate = (value: unknown): EvidenceBasedApproach => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is EvidenceBasedApproach => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
