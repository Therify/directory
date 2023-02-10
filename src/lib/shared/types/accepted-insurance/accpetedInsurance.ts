import * as z from 'zod';
import { ENTRIES as STATES } from '../state';
import { ENTRIES as INSURANCE_PROVIDERS } from '../insuranceProvider';

export const schema = z.object({
    insurances: z.enum(INSURANCE_PROVIDERS).array(),
    state: z.enum(STATES),
});

export type AcceptedInsurance = z.infer<typeof schema>;

export const validate = (value: unknown): AcceptedInsurance => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is AcceptedInsurance => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
