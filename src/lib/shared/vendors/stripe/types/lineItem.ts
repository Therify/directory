import * as z from 'zod';
import { schema as priceSchema } from './price';

export const schema = z.object({
    id: z.string(),
    object: z.literal('line_item'),
    period: z.object({
        end: z.number(),
        start: z.number(),
    }),
    proration: z.boolean(),
    quantity: z.number(),
    type: z.enum(['subscription', 'invoiceitem']),
    subscription: z.string().nullable(),
    subscription_item: z.string().nullable().optional(),
    amount_excluding_tax: z.number(),
    discountable: z.boolean(),
    discounts: z.array(z.string()),
    discount_amounts: z.array(
        z.object({
            amount: z.number(),
            discount: z.string(),
        })
    ),
    invoice_item: z.string().optional(),
    livemode: z.boolean(),
    unit_amount_excluding_tax: z.string(),
    tax_amounts: z.array(
        z
            .object({
                amount: z.number(),
                inclusive: z.boolean(),
                tax_rate: z.string(),
            })
            .nullable()
    ),
    price: priceSchema,
    proration_details: z.object({
        credited_items: z
            .object({
                invoice: z.string(),
                invoice_line_items: z.array(z.string()),
            })
            .nullable(),
    }),
    //  tax_rates: TODO: Add tax rates type if needed
});

export type LineItem = z.infer<typeof schema>;

export const validate = (value: unknown): LineItem => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is LineItem => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
