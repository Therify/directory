import * as z from 'zod';
import { ENTRIES as STATES } from '../address/united-states/state';

export const ACCEPTED_INSURANCES = [
    'Aetna',
    'Affinity Health Plan',
    'Alliance',
    'Amerigroup',
    'AmeriHealth',
    'Anthem',
    'Beacon',
    'Behavioral Health Systems',
    'Blue Care Network',
    'BlueCross Blue Shield',
    'CareFirst',
    'Ceridian',
    'Cigna',
    'Coventry',
    'EmblemHealth',
    'Fidelis',
    'Guardian',
    'Harvard Pilgrim',
    'HealthFirst',
    'Humana',
    'Kaiser',
    'Medicaid',
    'Medicare',
    'Meritian Health',
    'MetroPlus Health Plan',
    'Optum',
    'Oscar',
    'TRICARE',
    'UnitedHealthcare',
] as const;

export const schema = z.object({
    insurances: z.enum(ACCEPTED_INSURANCES).array(),
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
