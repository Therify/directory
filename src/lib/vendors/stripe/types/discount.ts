import * as z from 'zod';

export const schema = z.object({
    customer: z.string(),
    discount: z.object({
        coupon: z.object({
            amount_off: z.number(),
            created: z.number(),
            currency: z.string(),
            duration: z.string(),
            duration_in_months: z.number(),
            livemode: z.boolean(),
            max_redemptions: z.number(),
            metadata: z.object({}),
            name: z.string(),
            percent_off: z.number(),
            redeem_by: z.number(),
            times_redeemed: z.number(),
            valid: z.boolean(),
        }),
        customer: z.string(),
        end: z.number(),
        id: z.string(),
        object: z.literal('discount'),
        start: z.number(),
        subscription: z.string(),
    }),
    id: z.string(),
    object: z.literal('discount'),
    subscription: z.string(),
});

export type Discount = z.infer<typeof schema>;

export const validate = (value: unknown): Discount => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Discount => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
