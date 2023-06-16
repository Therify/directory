import * as z from 'zod';

export const ENTRIES = [
    'Aetna',
    'Affinity Health Plan',
    'Alliance',
    'Amerigroup',
    'AmeriHealth',
    'Anthem',
    'Anthem MediCal',
    'Beacon',
    'Behavioral Health Systems',
    'Blue Care Network',
    'BlueCross Blue Shield',
    'CareFirst',
    'Ceridian',
    'Cigna',
    'Coventry',
    'ComPsych',
    'EmblemHealth',
    'Fidelis',
    'Guardian',
    'Harvard Pilgrim',
    'HealthFirst',
    'Humana',
    'Kaiser',
    'Medavie Blue Cross',
    'MHN (Health Net)',
    'MHN MediCal',
    'Medicaid',
    'Medicare',
    'Meritian Health',
    'MetroPlus Health Plan',
    'Optum',
    'Oscar',
    'TRICARE',
    'UnitedHealthcare',
    "I don't have insurance",
] as const;

export const MAP = {
    AETNA: 'Aetna',
    AFFINITY_HEALTH_PLAN: 'Affinity Health Plan',
    ALLIANCE: 'Alliance',
    AMERIGROUP: 'Amerigroup',
    AMERIHEALTH: 'AmeriHealth',
    ANTHEM: 'Anthem',
    BEACON: 'Beacon',
    BEHAVIORAL_HEALTH_SYSTEMS: 'Behavioral Health Systems',
    BLUE_CARE_NETWORK: 'Blue Care Network',
    BLUECROSS_BLUESHIELD: 'BlueCross Blue Shield',
    CAREFIRST: 'CareFirst',
    CERIDIAN: 'Ceridian',
    CIGNA: 'Cigna',
    COVENTRY: 'Coventry',
    EMBLEMHEALTH: 'EmblemHealth',
    FIDELIS: 'Fidelis',
    GUARDIAN: 'Guardian',
    HARVARD_PILGRIM: 'Harvard Pilgrim',
    HEALTHFIRST: 'HealthFirst',
    HUMANA: 'Humana',
    KAISER: 'Kaiser',
    MEDICAID: 'Medicaid',
    MEDICARE: 'Medicare',
    MERITIAN_HEALTH: 'Meritian Health',
    METROPLUS_HEALTH_PLAN: 'MetroPlus Health Plan',
    OPTUM: 'Optum',
    OSCAR: 'Oscar',
    TRICARE: 'TRICARE',
    UNITEDHEALTHCARE: 'UnitedHealthcare',
    I_DONT_HAVE_INSURANCE: "I don't have insurance",
} as const;

export const schema = z.enum(ENTRIES);

export type InsuranceProvider = z.infer<typeof schema>;

export const validate = (value: unknown): InsuranceProvider => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is InsuranceProvider => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
