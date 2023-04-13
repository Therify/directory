import { StripeInvoice } from '@/lib/shared/vendors/stripe';
import * as z from 'zod';

export const schema = z
    .object({
        startDate: z.string(),
        endDate: z.string(),
        stripeSubscriptionId: z.string(),
        stripeCustomerId: z.string(),
        seats: z.number(),
        invoiceId: z.string(),
        invoiceTotal: z.number(),
        invoiceAmountDue: z.number(),
        invoiceAmountPaid: z.number(),
        invoiceAmountRemaining: z.number(),
        invoicePdf: z.string().optional(),
        invoiceStatus: StripeInvoice.schema.shape.status,
        priceId: z.string(),
        coveredSessions: z.number(),
    })
    .refine((data) => data.seats > 0, {
        message: 'Must have at least one seat.',
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
