import * as z from 'zod';

export const stripePlanTier = z.object({
    flat_amount: z.number(),
    flat_amount_decimal: z.string(),
    unit_amount: z.number(),
    unit_amount_decimal: z.string(),
    up_to: z.number(),
});

export const schema = z.object({
    active: z.boolean(),
    aggregate_usage: z.string(),
    amount: z.number(),
    amount_decimal: z.string(),
    billing_scheme: z.string(),
    created: z.number(),
    currency: z.string(),
    id: z.string(),
    interval: z.string(),
    interval_count: z.number(),
    livemode: z.boolean(),
    metadata: z.object({}),
    nickname: z.string(),
    object: z.literal('plan'),
    product: z.string(),
    tiers: z.array(stripePlanTier),
    tiers_mode: z.string(),
    transform_usage: z.object({
        divide_by: z.number(),
        round: z.string(),
    }),
    trial_period_days: z.number(),
    usage_type: z.string(),
});

export type Plan = z.infer<typeof schema>;

export const validate = (value: unknown): Plan => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Plan => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
