import * as z from 'zod';
import { ENTRIES as STATES } from '../state';
import { ENTRIES as INSURANCE_PROVIDERS } from '../insuranceProvider';

const licenseSchema = z.object({
    type: z.string(),
    licenseNumber: z.string(),
    expirationDate: z.string(),
});

export const schema = z.object({
    state: z.enum(STATES),
    acceptedInsurances: z.enum(INSURANCE_PROVIDERS).array(),
    licenses: licenseSchema.array(),
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
