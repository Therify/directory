import { Company } from '@therify/concepts';
import * as z from 'zod';

const providerDetails = z
    .object({
        givenName: z.string(),
        surname: z.string(),
        emailAddress: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
        dateOfBirth: z.string(),
        practiceName: Company.SCHEMA.optional().default('Unselected'),
        hasAcceptedTermsAndConditions: z.boolean().default(false),
    })
    .refine(
        (data) =>
            data.password === data.confirmPassword &&
            data.hasAcceptedTermsAndConditions,
        {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        }
    );

export const schema = z.object({
    providerDetails,
    numberOfSeats: z.number().default(1),
    priceId: z.string(),
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
