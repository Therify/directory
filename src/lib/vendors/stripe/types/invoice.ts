import * as z from 'zod';
import { schema as lineItemSchema } from './lineItem';

export const schema = z.object({
    id: z.string(),
    auto_advance: z.boolean().optional(),
    charge: z.string().nullable(),
    collection_method: z.enum(['charge_automatically', 'send_invoice']),
    currency: z.enum(['usd']),
    customer: z.string().nullable(),
    description: z.string().nullable(),
    hosted_invoice_url: z.string().nullable(),
    lines: z.object({
        object: z.literal('list'),
        has_more: z.boolean(),
        url: z.string(),
        data: z.array(lineItemSchema),
    }),
    metadata: z.record(z.string()),
    payment_intent: z.string().nullable(),
    period_end: z.number(),
    period_start: z.number(),
    status: z.enum(['draft', 'open', 'paid', 'uncollectible', 'void']),
    subscription: z.string().nullable(),
    total: z.number(),
    amount_due: z.number(),
    amount_paid: z.number(),
    amount_remaining: z.number(),
    attempt_count: z.number(),
    created: z.number(),
    billing_reason: z
        .enum([
            'subscription_create',
            'subscription_cycle',
            'subscription_update',
            'subscription',
            'manual',
            'upcoming',
            'subscription_threshold',
        ])
        .nullable(),
    invoicePdf: z.string().optional(),
    next_payment_attempt: z.number().nullable(),
});

export type Type = z.infer<typeof schema>;

export const validate = (value: unknown): Type => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
