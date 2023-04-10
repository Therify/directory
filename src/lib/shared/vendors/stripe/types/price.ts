import * as z from 'zod';

export const schema = z.object({
    id: z.string(),
    object: z.literal('price'),
    active: z.boolean(),
    billing_scheme: z.enum(['per_unit', 'tiered']),
    created: z.number(),
    currency: z.enum(['usd']),
    livemode: z.boolean(),
    lookup_key: z.string().nullable(),
    metadata: z.record(z.string()),
    nickname: z.string().nullable(),
    product: z.string(),
    recurring: z
        .object({
            aggregate_usage: z
                .enum(['sum', 'last_during_period', 'last_ever', 'max'])
                .nullable(),
            interval: z.enum(['month', 'year', 'week', 'day']),
            interval_count: z.number(),
            usage_type: z.enum(['licensed', 'metered']),
        })
        .nullable(),
    tax_behavior: z.enum(['exclusive', 'inclusive', 'unspecified']),
    tiers_mode: z.enum(['graduated', 'volume']).nullable(),
    transform_quantity: z
        .object({
            divide_by: z.number(),
            round: z.enum(['up', 'down']),
        })
        .nullable(),
    type: z.enum(['recurring', 'one_time']),
    unit_amount: z.number(),
    unit_amount_decimal: z.string(),
});

export type Price = z.infer<typeof schema>;

export const validate = (value: unknown): Price => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Price => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
