import * as z from 'zod';
import { ROLES } from '@/lib/shared/types/roles';
import { UNITED_STATES } from '@/lib/shared/types/address/united-states';
import { Ethnicity, Gender, InsuranceProvider } from '@/lib/shared/types';
import {
    validatePasswordHasNumber,
    validatePasswordHasSpecialCharacter,
    validatePasswordHasLowercase,
    validatePasswordHasUppercase,
    validateDateIsValid,
    validateMinimumDate,
    validateIsPastDate,
    validateMinimumAge,
} from '@/lib/shared/components/ui/FormElements/form-validation';

export const schema = z
    .object({
        user: z.object({
            givenName: z.string().nonempty({
                message: 'First name is required',
            }),
            surname: z.string().nonempty({
                message: 'Last name is required',
            }),
            emailAddress: z
                .string()
                .nonempty({
                    message: 'Email is required',
                })
                .email({
                    message: 'Email is invalid!',
                }),
            password: z
                .string()
                .nonempty({
                    message: 'Password is required',
                })
                .min(8, {
                    message: 'Password must be at least 8 characters long',
                })
                .refine((value) => validatePasswordHasNumber(value), {
                    message: 'Password must contain a number (0-9)',
                })
                .refine((value) => validatePasswordHasSpecialCharacter(value), {
                    message:
                        'Password must contain a special character (!@#$%^&*)',
                })
                .refine((value) => validatePasswordHasLowercase(value), {
                    message: 'Password must contain a lowercase letter (a-z)',
                })
                .refine((value) => validatePasswordHasUppercase(value), {
                    message: 'Password must contain an uppercase letter (A-Z)',
                }),
            confirmPassword: z.string().nonempty(),
            dateOfBirth: z
                .date()
                .refine((date) => validateDateIsValid(date), {
                    message: 'Date is invalid',
                })
                .refine(
                    (date) => validateMinimumDate(date, new Date(1900, 0, 1)),
                    { message: 'Date of birth must be after 01/01/1900' }
                )
                .refine((date) => validateIsPastDate(date), {
                    message: 'Date must be in the past',
                })
                .refine((date) => validateMinimumAge(date, 18), {
                    message: 'Must be at least 18 years old',
                }),
            role: z.enum([ROLES.MEMBER]),
            phoneNumber: z.string().refine(
                (value: string) => {
                    const phoneNumber = value.replace(/\D/g, '');
                    return phoneNumber.length === 10;
                },
                {
                    message: 'Please enter a 10 digit phone number',
                }
            ),
        }),
        profile: z.object({
            state: z.enum(UNITED_STATES.STATE.ENTRIES),
            insurance: z.enum(InsuranceProvider.ENTRIES),
            gender: z.enum(Gender.ENTRIES),
            ethnicity: z.enum(Ethnicity.ENTRIES),
            homeAddress: z.string().nonempty({
                message: 'Your home address is required',
            }),
        }),
        emergencyDetails: z.object({
            contactName: z.string().nonempty({
                message: 'Contact name is required',
            }),
            contactPhoneNumber: z
                .string()
                .nonempty({
                    message: 'Contact phone number is required',
                })
                .refine(
                    (value: string) => {
                        const phoneNumber = value.replace(/\D/g, '');
                        return phoneNumber.length === 10;
                    },
                    {
                        message: 'Please enter a 10 digit phone number',
                    }
                ),
            contactRelationship: z.string().nonempty({
                message: 'Contact relationship is required',
            }),
        }),
        hasAcceptedTermsAndConditions: z
            .boolean()
            .default(false)
            .refine((value) => value === true, {
                message: 'You must accept the terms and conditions',
            }),
        registrationCode: z.string().optional(),
    })
    .refine((data) => data.user.password === data.user.confirmPassword, {
        message: 'Passwords do not match',
        path: ['user.confirmPassword'],
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
