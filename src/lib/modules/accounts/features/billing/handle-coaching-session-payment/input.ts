import { SessionInvoiceSchema } from '@/lib/shared/schema';
import * as z from 'zod';

export const schema = z.object({
    stripeCustomerId: z.string(),
    dateOfSession: z.string().optional(),
    priceId: z.string(),
    invoiceId: z.string(),
    invoiceTotal: z.number(),
    invoiceAmountDue: z.number(),
    invoiceAmountPaid: z.number(),
    invoiceAmountRemaining: z.number(),
    invoicePdf: z.string().optional(),
    hostedInvoiceUrl: z.string().optional(),
    invoiceStatus: SessionInvoiceSchema.shape.status,
    invoiceNumber: z.string().optional(),
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
