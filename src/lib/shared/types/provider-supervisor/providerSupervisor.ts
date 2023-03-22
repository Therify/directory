import * as z from 'zod';
import { UNITED_STATES, CANADA } from '../address';

export const schema = z.object({
    name: z.string(),
    npiNumber: z.string(),
    supervisorLicense: z.discriminatedUnion('country', [
        z.object({
            expiration: z.string(),
            licenseNumber: z.string(),
            state: z.enum(CANADA.PROVINCE.ENTRIES),
            country: z.literal(CANADA.COUNTRY.CODE),
        }),
        z.object({
            expiration: z.string(),
            licenseNumber: z.string(),
            state: z.enum(UNITED_STATES.STATE.ENTRIES),
            country: z.literal(UNITED_STATES.COUNTRY.CODE),
        }),
    ]),
});

export type ProviderSupervisor = z.infer<typeof schema>;

export const validate = (value: unknown): ProviderSupervisor => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is ProviderSupervisor => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
