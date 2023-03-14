import * as z from 'zod';
import { ENTRIES as STATES } from '../address/united-states/state';

export const schema = z.object({
    name: z.string(),
    npiNumber: z.string(),
    supervisorLicense: z.object({
        expiration: z.string(),
        licenseNumber: z.string(),
        state: z.enum(STATES),
    }),
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
