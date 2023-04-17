import * as z from 'zod';
import { schema as stripePlan } from './plan';
import { schema as stripeDiscount } from './discount';

export const stripeSubscriptionItem = z.object({
    id: z.string(),
    object: z.literal('subscription_item'),
    billing_thresholds: z
        .object({
            usage_gte: z.number(),
        })
        .nullable(),
    created: z.number(),
    metadata: z.object({}),
    plan: stripePlan,
    quantity: z.number(),
    subscription: z.string(),
    tax_rates: z.array(z.string()),
});

export const schema = z.object({
    id: z.string(),
    object: z.literal('subscription'),
    application_fee_percent: z.number().nullable(),
    billing: z.string().optional(),
    billing_cycle_anchor: z.number(),
    billing_thresholds: z
        .object({
            amount_gte: z.number(),
            reset_billing_cycle_anchor: z.boolean(),
        })
        .nullable(),
    cancel_at: z.number().nullable(),
    cancel_at_period_end: z.boolean(),
    canceled_at: z.number().nullable(),
    collection_method: z.string(),
    created: z.number(),
    current_period_end: z.number(),
    current_period_start: z.number(),
    customer: z.string(),
    days_until_due: z.number().nullable(),
    default_payment_method: z.string().nullable(),
    default_source: z.string().nullable(),
    default_tax_rates: z.array(z.string()),
    discount: stripeDiscount.nullable(),
    ended_at: z.number().nullable(),
    items: z.object({
        object: z.literal('list'),
        has_more: z.boolean(),
        url: z.string(),
        data: z.array(stripeSubscriptionItem),
    }),
    latest_invoice: z.string(),
    livemode: z.boolean(),
    metadata: z.object({}),
    next_pending_invoice_item_invoice: z.number().nullable(),
    on_behalf_of: z.string().nullable(),
    pause_collection: z
        .object({
            behavior: z.string(),
            resumes_at: z.number(),
        })
        .nullable(),
    pending_invoice_item_interval: z
        .object({
            interval: z.string(),
            interval_count: z.number(),
        })
        .nullable(),
    pending_setup_intent: z.string().nullable(),
    pending_update: z
        .object({
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
        })
        .nullable(),
    plan: stripePlan.nullable(),
    quantity: z.number().nullable(),
    schedule: z.string().nullable(),
    start_date: z.number(),
    start_proration_behavior: z.string().optional(),
    status: z.string(),
    tax_percent: z.number().optional(),
    transfer_data: z
        .object({
            amount_percent: z.number(),
            destination: z.string(),
        })
        .nullable(),
    trial_end: z.number().nullable(),
    trial_start: z.number().nullable(),
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
