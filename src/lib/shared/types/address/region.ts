import * as z from 'zod';
import { CANADA } from './canada';
import { UNITED_STATES } from './united-states';

export const ENTRIES = [
    ...UNITED_STATES.STATE.ENTRIES,
    ...CANADA.PROVINCE.ENTRIES,
] as const;

export const schema = z.enum(ENTRIES);

export type Type = z.infer<typeof schema>;

export const validate = (value: unknown): Type => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};

export const stateAndCountrySchema = z.discriminatedUnion('country', [
    z.object({
        state: z.enum(UNITED_STATES.STATE.ENTRIES),
        country: z.literal(UNITED_STATES.COUNTRY.CODE),
    }),
    z.object({
        state: z.enum(CANADA.PROVINCE.ENTRIES),
        country: z.literal(CANADA.COUNTRY.CODE),
    }),
]);

export type StateAndCountry = z.infer<typeof stateAndCountrySchema>;
