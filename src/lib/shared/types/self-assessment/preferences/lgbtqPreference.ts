import * as z from 'zod';
import { basePreferenceSchema } from './basePreference';

export const schema = basePreferenceSchema.extend({
    type: z.literal('lgbtq'),
});

export type LGBTQPreference = z.infer<typeof schema>;

export const validate = (value: unknown): LGBTQPreference => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is LGBTQPreference => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
