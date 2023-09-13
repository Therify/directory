import * as z from 'zod';
import { ROLES } from '@/lib/shared/types/roles';
import { UNITED_STATES } from '@/lib/shared/types/address/united-states';
import { Ethnicity, Gender, InsuranceProvider } from '@/lib/shared/types';
import {
    isValidEmail,
    refineIsValidDateOfBirth,
    refineIsValidPassword,
} from '@/lib/shared/components/ui/FormElements/form-validation';

export const schema = z
    .object({
        user: z.object({
            givenName: z.string().nonempty(),
            surname: z.string().nonempty(),
            emailAddress: z
                .string()
                .nonempty()
                .refine((value) => {
                    if (!isValidEmail(value)) {
                        return {
                            message: 'Email is invalid',
                            path: ['user.emailAddress'],
                        };
                    }
                }),
            password: z
                .string()
                .nonempty({
                    message: 'Password is required',
                })
                .refine((value) =>
                    refineIsValidPassword(value, 'user.password')
                ),
            confirmPassword: z.string().nonempty(),
            dateOfBirth: z
                .date()
                .refine((value) =>
                    refineIsValidDateOfBirth(value, 'user.dateOfBirth')
                ),
            role: z.enum([ROLES.MEMBER]),
            phoneNumber: z.string().refine(refinePhoneNumber),
        }),
        profile: z.object({
            state: z.enum(UNITED_STATES.STATE.ENTRIES),
            country: z.enum([UNITED_STATES.COUNTRY.CODE]),
            insurance: z.enum(InsuranceProvider.ENTRIES),
            gender: z.enum(Gender.ENTRIES),
            ethnicity: z.enum(Ethnicity.ENTRIES),
        }),
        emergencyDetails: z.object({
            contactName: z.string().nonempty({
                message: 'Contact name is required',
            }),
            memberHomeAddress: z.string().nonempty({
                message: "Member's home address is required",
            }),
            contactPhoneNumber: z
                .string()
                .nonempty({
                    message: 'Contact phone number is required',
                })
                .refine(refinePhoneNumber),
            contactRelationship: z.string().nonempty({
                message: 'Contact relationship is required',
            }),
        }),
        hasAcceptedTermsAndConditions: z
            .boolean()
            .default(false)
            .refine((value) => {
                if (!value) {
                    return {
                        message: 'You must accept the terms and conditions',
                        path: ['hasAcceptedTermsAndConditions'],
                    };
                }
            }),
        registrationCode: z.string().optional(),
    })
    .refine((data) => {
        if (data.user.password !== data.user.confirmPassword) {
            return {
                message: 'Passwords do not match',
                path: ['user.confirmPassword'],
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

function refinePhoneNumber(value: string) {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length !== 10) {
        return {
            message: 'Please enter a 10 digit phone number',
            path: ['user.phoneNumber'],
        };
    }
}
