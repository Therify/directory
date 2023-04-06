import * as z from 'zod';

const baseSchema = z.object({
    priceId: z.string(),
    quantity: z.number().optional(),
    customerId: z.string(),
    metadata: z.record(z.string()).optional(),
    lineItemDescription: z.string().optional(),
    connectedAccountData: z
        .object({
            stripeConnectAccountId: z.string(),
            applicationFeeInCents: z.number(),
            receiptEmail: z.string(),
        })
        .optional(),
});
export const schema = z.discriminatedUnion('collectionMethod', [
    baseSchema.extend({
        collectionMethod: z.literal('send_invoice'),
        shouldSendEmail: z.boolean().optional(),
        daysUntilDue: z.number().optional(),
    }),
    baseSchema.extend({
        collectionMethod: z.literal('charge_automatically'),
        autoAdvance: z.boolean().optional(),
        shouldImmediatelyCharge: z.boolean().optional(),
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
