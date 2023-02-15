import * as z from 'zod';
import { ROLES } from '@/lib/shared/types/roles';

export const schema = z
    .object({
        givenName: z.string(),
        surname: z.string(),
        emailAddress: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
        dateOfBirth: z.string(),
        hasAcceptedTermsAndConditions: z.boolean().default(false),
        role: z.enum([ROLES.PROVIDER_THERAPIST, ROLES.PROVIDER_COACH]),
        invitationId: z.string(),
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
