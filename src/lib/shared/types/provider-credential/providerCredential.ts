import * as z from 'zod';
import { ENTRIES as STATES } from '../address/united-states/state';

export const schema = z.object({
    state: z.enum(STATES),
    type: z.string(),
    licenseNumber: z.string(),
    expirationDate: z.string(),
});

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
