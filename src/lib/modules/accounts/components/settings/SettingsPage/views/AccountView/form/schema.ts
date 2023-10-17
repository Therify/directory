import { Gender, UNITED_STATES, Ethnicity } from '@/lib/shared/types';
import z from 'zod';

export const schema = z.object({
    accountDetails: z.object({
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
                message: 'Email is invalid',
            }),
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
    personalDetails: z.object({
        state: z.enum(UNITED_STATES.STATE.ENTRIES),
        gender: z.enum(Gender.ENTRIES),
        ethnicity: z.enum(Ethnicity.ENTRIES),
    }),
    emergencyDetails: z.object({
        homeAddress: z.string().nonempty({
            message: 'Your home address is required',
        }),
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
});

export type Type = z.infer<typeof schema>;
