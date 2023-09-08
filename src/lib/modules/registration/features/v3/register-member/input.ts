import * as z from 'zod';
import { ROLES } from '@/lib/shared/types/roles';
import { UNITED_STATES } from '@/lib/shared/types/address/united-states';
import { Ethnicity, Gender, InsuranceProvider } from '@/lib/shared/types';

export const schema = z
    .object({
        user: z.object({
            givenName: z.string(),
            surname: z.string(),
            emailAddress: z.string(),
            password: z.string(),
            confirmPassword: z.string(),
            dateOfBirth: z.string(),
            role: z.enum([ROLES.MEMBER]),
            phoneNumber: z.string(),
        }),
        profile: z.object({
            state: z.enum(UNITED_STATES.STATE.ENTRIES),
            country: z.enum([UNITED_STATES.COUNTRY.CODE]),
            insurance: z.enum(InsuranceProvider.ENTRIES),
            gender: z.enum(Gender.ENTRIES),
            ethnicity: z.enum(Ethnicity.ENTRIES),
        }),
        emergencyDetails: z.object({
            contactName: z.string(),
            memberHomeAddress: z.string(),
            contactPhoneNumber: z.string(),
            contactRelationship: z.string(),
        }),
        hasAcceptedTermsAndConditions: z.boolean().default(false),
        registrationCode: z.string().optional(),
    })
    .refine((data) => {
        if (data.user.password !== data.user.confirmPassword) {
            return {
                message: 'Passwords do not match',
                path: ['user.confirmPassword'],
            };
        }
        if (!data.hasAcceptedTermsAndConditions) {
            return {
                message: 'You must accept the terms and conditions',
                path: ['hasAcceptedTermsAndConditions'],
            };
        }
    });

export type Input = z.infer<typeof schema>;

export const validate = (value: unknown): Input => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Input => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
