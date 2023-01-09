import * as z from 'zod';
import { schema as stripePlan, stripePlanTier } from './plan';
import { schema as stripeDiscount } from './discount';

export const stripeSubscriptionItem = z.object({
    id: z.string(),
    object: z.literal('subscription_item'),
    billing_thresholds: z.object({
        usage_gte: z.number(),
    }),
    created: z.number(),
    metadata: z.object({}),
    plan: z.object({
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
    }),
    quantity: z.number(),
    subscription: z.string(),
    tax_rates: z.array(z.string()),
});

export const schema = z.object({
    id: z.string(),
    object: z.literal('subscription'),
    application_fee_percent: z.number(),
    billing: z.string(),
    billing_cycle_anchor: z.number(),
    billing_thresholds: z.object({
        amount_gte: z.number(),
        reset_billing_cycle_anchor: z.boolean(),
    }),
    cancel_at: z.number(),
    cancel_at_period_end: z.boolean(),
    canceled_at: z.number(),
    collection_method: z.string(),
    created: z.number(),
    current_period_end: z.number(),
    current_period_start: z.number(),
    customer: z.string(),
    days_until_due: z.number(),
    default_payment_method: z.string(),
    default_source: z.string(),
    default_tax_rates: z.array(z.string()),
    discount: stripeDiscount,
    ended_at: z.number(),
    items: z.array(stripeSubscriptionItem),
    latest_invoice: z.string(),
    livemode: z.boolean(),
    metadata: z.object({}),
    next_pending_invoice_item_invoice: z.number(),
    on_behalf_of: z.string(),
    pause_collection: z.object({
        behavior: z.string(),
        resumes_at: z.number(),
    }),
    pending_invoice_item_interval: z.object({
        interval: z.string(),
        interval_count: z.number(),
    }),
    pending_setup_intent: z.string(),
    pending_update: z.object({
        billing_cycle_anchor: z.number(),
        billing_thresholds: z.object({
            amount_gte: z.number(),
            reset_billing_cycle_anchor: z.boolean(),
        }),
        cancel_at_period_end: z.boolean(),
        collection_method: z.string(),
        default_payment_method: z.string(),
        default_source: z.string(),
        default_tax_rates: z.array(z.string()),
        items: z.array(stripeSubscriptionItem),
        proration_behavior: z.string(),
        proration_date: z.number(),
        transfer_data: z.object({
            amount_percent: z.number(),
            destination: z.string(),
        }),
    }),
    plan: stripePlan,
    quantity: z.number(),
    schedule: z.string(),
    start_date: z.number(),
    start_proration_behavior: z.string(),
    status: z.string(),
    tax_percent: z.number(),
    transfer_data: z.object({
        amount_percent: z.number(),
        destination: z.string(),
    }),
    trial_end: z.number(),
    trial_start: z.number(),
});

export type Subscription = z.infer<typeof schema>;

export const validate = (value: unknown): Subscription => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Subscription => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
