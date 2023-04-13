import * as z from 'zod';

const baseSchema = z.object({
    customerId: z.string(),
    successUrl: z.string(),
    cancelUrl: z.string(),
    checkoutMode: z.enum(['payment', 'setup', 'subscription']),
    submitMessage: z.string().optional(),
    allowPromotionCodes: z.boolean().optional().default(true),
    expiresInSeconds: z.number().optional(),
    metadata: z.record(z.string()).optional(),
    connectedAccountData: z
        .object({
            stripeConnectAccountId: z.string(),
            applicationFeeInCents: z.number(),
            receiptEmail: z.string(),
        })
        .optional(),
});
const priceOptionSchema = z.object({
    priceId: z.string(),
    quantity: z.number().optional(),
});
export const schema = z.union([
    baseSchema.merge(priceOptionSchema),
    baseSchema.extend({
        lineItems: priceOptionSchema.array(),
    }),
]);

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
