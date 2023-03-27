import { z } from 'zod';
import { Ethnicity } from '../../ethnicity';
import { basePreferenceSchema } from './basePreference';

export const ENTRIES = [...Ethnicity.ENTRIES, "Don't care"] as const;

export const schema = basePreferenceSchema.extend({
    type: z.literal('ethnic'),
    selection: z.enum(ENTRIES).nullable(),
});

export type EthnicPreference = z.infer<typeof schema>;

export const validate = (value: unknown): EthnicPreference => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is EthnicPreference => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
