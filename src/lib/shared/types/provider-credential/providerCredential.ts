import * as z from 'zod';
import { UNITED_STATES, CANADA } from '../address';
const baseSchema = z.object({
    type: z.string(),
    licenseNumber: z.string(),
    expirationDate: z.string(),
});

export const schema = z.discriminatedUnion('country', [
    baseSchema.extend({
        state: z.enum(CANADA.PROVINCE.ENTRIES),
        country: z.literal(CANADA.COUNTRY.CODE),
    }),
    baseSchema.extend({
        state: z.enum(UNITED_STATES.STATE.ENTRIES),
        country: z.literal(UNITED_STATES.COUNTRY.CODE),
    }),
]);

export type ProviderCredential = z.infer<typeof schema>;

export const validate = (value: unknown): ProviderCredential => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is ProviderCredential => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
