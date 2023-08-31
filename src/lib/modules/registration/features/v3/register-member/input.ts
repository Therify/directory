import * as z from 'zod';
import { ROLES } from '@/lib/shared/types/roles';
import { MemberProfileSchema } from '@/lib/shared/schema';

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
        }),
        profile: MemberProfileSchema.pick({
            insurance: true,
            state: true,
            country: true,
            ethnicity: true,
            gender: true,
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
