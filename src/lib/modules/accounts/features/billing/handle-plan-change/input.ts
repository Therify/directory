import * as z from 'zod';
import { StripeInvoiceSchema } from '@/lib/shared/schema';

export const schema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    stripeSubscriptionId: z.string(),
    stripeCustomerId: z.string(),
    invoiceId: z.string(),
    invoiceTotal: z.number(),
    invoiceAmountDue: z.number(),
    invoiceAmountPaid: z.number(),
    invoiceAmountRemaining: z.number(),
    invoicePdf: z.string().optional(),
    invoiceStatus: StripeInvoiceSchema.shape.status,
    newStripePriceId: z.string(),
    previousStripePriceId: z.string(),
    previousSeatCount: z.number(),
    newSeatCount: z.number(),
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
