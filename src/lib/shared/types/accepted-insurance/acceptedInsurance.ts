import * as z from 'zod';
import { CANADA, UNITED_STATES } from '../address';

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

const baseSchema = z.object({
    insurances: z.enum(ACCEPTED_INSURANCES).array(),
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
