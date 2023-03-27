import * as z from 'zod';
import { Gender } from '../../gender';
import { basePreferenceSchema } from './basePreference';

export const ENTRIES = [...Gender.ENTRIES, "Don't care"] as const;

export const schema = basePreferenceSchema.extend({
    type: z.literal('gender'),
    selection: z.enum(ENTRIES).nullable(),
});

export type GenderPreference = z.infer<typeof schema>;

export const validate = (value: unknown): GenderPreference => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is GenderPreference => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};

export const genderPreferenceSchema = basePreferenceSchema.extend({
    type: z.literal('gender'),
    selection: Gender.schema,
});
