import * as z from 'zod';
import { boolean } from 'zod';
import { Ethnicity } from '../ethnicity';
import { Gender } from '../gender';
import { Goal } from '../goals';
import { Issue } from '../issues';
import { Religion } from '../religion';
import { Language } from '../language';

const basePreference = z.object({
    selection: z.string(),
    isRequired: z.boolean().default(false),
});

const genderPreference = basePreference.extend({
    type: z.literal('gender'),
    selection: Gender.schema,
});

const ethnicPreference = basePreference.extend({
    type: z.literal('ethnic'),
    selection: Ethnicity.schema,
});

const religiousPreference = basePreference.extend({
    type: z.literal('religious'),
    selection: Religion.schema,
});

const languagePreference = basePreference.extend({
    type: z.literal('language'),
    selection: Language.schema.default('English'),
});

const preferenceSchema = z.union([
    genderPreference,
    ethnicPreference,
    religiousPreference,
    languagePreference,
]);

export const schema = z.object({
    concerns: Issue.schema.array(),
    goals: Goal.schema.array(),
    notes: z.string().optional(),
    preferences: z.object({
        religious: preferenceSchema,
        ethnicity: preferenceSchema,
        gender: preferenceSchema,
        language: preferenceSchema,
        lgbtq: boolean().default(false),
    }),
});

export type SelfAssessment = z.infer<typeof schema>;

export const validate = (value: unknown): SelfAssessment => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is SelfAssessment => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
