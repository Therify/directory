import * as z from 'zod';

export const schema = z.object({
    member: z.object({
        state: z.string(),
        insurance: z.string(),
        concerns: z.string().array().default([]),
        givenName: z.string(),
        surname: z.string(),
        emailAddress: z.string(),
    }),
    plan: z
        .object({
            numberOfCoveredSessions: z.number(),
            planName: z.string(),
        })
        .optional(),
    provider: z.object({
        givenName: z.string(),
    }),
});

export type ReferralEmailProps = z.infer<typeof schema>;

export const validate = (value: unknown): ReferralEmailProps => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is ReferralEmailProps => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
