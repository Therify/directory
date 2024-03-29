import { StripeWebhookParams } from '../../../webhookParams';
import { inferAsyncReturnType } from '@trpc/server';
import { StripeInvoice, StripeUtils } from '@/lib/shared/vendors/stripe';
import {
    handleMembershipPayment,
    handleOneTimePayment,
    handlePlanChange,
} from './handlers';
import {
    getProductsByEnvironment,
    isValidMembershipPriceId,
    PRODUCTS,
} from '@/lib/shared/types';
import { NodeEnvironment } from '@/lib/shared/types/nodeEnvironment';

type HandlerResult = inferAsyncReturnType<
    | typeof handlePlanChange
    | typeof handleOneTimePayment
    | typeof handleMembershipPayment
>;

const ALL_PRODUCTS = getProductsByEnvironment(
    process.env.VERCEL_ENV as NodeEnvironment
);
const COVERED_COACHING_SESSION =
    ALL_PRODUCTS[PRODUCTS.COVERED_COACHING_SESSION];

export const handleInvoicePaidFactory =
    ({ accounts }: StripeWebhookParams) =>
    async (rawInvoice: unknown) => {
        const invoice = StripeInvoice.schema.parse(rawInvoice);
        const {
            customer: customerId,
            subscription: subscriptionId,
            billing_reason,
        } = invoice;
        if (!customerId) {
            throw new Error('No customer id found on invoice');
        }

        if (!StripeUtils.isSupportedBillingReason(billing_reason)) {
            throw new Error(`Unexpected billing reason: ${billing_reason}`);
        }

        const [lineItem] = invoice.lines.data;
        const isSubscriptionChange = billing_reason === 'subscription_update';

        const isCoachingSessionPriceId = Object.values(
            COVERED_COACHING_SESSION.PRICES
        ).includes(lineItem.price.id);

        const isMembershipPlanPriceId = isValidMembershipPriceId(
            lineItem.price.id,
            process.env.VERCEL_ENV as NodeEnvironment
        );

        let result: HandlerResult | undefined = undefined;
        if (!subscriptionId) {
            if (!invoice.metadata.dateOfSession) {
                // App generated coaching invoices will have a dateOfSession metadata field
                // If it's not present, we can assume it's an invoice generated from the dashboard
                // and can be ignored.
                //TODO: Remove this once we're no longer using the Stripe dashboard
                // to generate coaching invoices
                return { success: true };
            }
            result = await handleOneTimePayment({
                accounts,
                customerId,
                priceId: lineItem.price.id,
                invoice,
            });
        } else if (isSubscriptionChange) {
            result = await handlePlanChange({
                accounts,
                customerId,
                subscriptionId,
                invoice,
            });
        } else if (isMembershipPlanPriceId || isCoachingSessionPriceId) {
            result = await handleMembershipPayment({
                accounts,
                invoice,
                customerId,
                subscriptionId,
            });
        }

        if (result === undefined) {
            throw new Error(
                `Could not handle invoice payment. Invoice id: ${invoice.id}}`
            );
        }

        if (result.isErr()) {
            let errorMessage = 'Could not handle invoice payment';
            result.mapErr(([errorStep, error]) => {
                const message = (error as Error)?.message;
                const failedStepMessage = `Failed on step: ${errorStep} for billing reason: ${billing_reason} and price id: ${lineItem.price.id}`;
                errorMessage = `[handleInvoicePayment error]: ${
                    message ?? failedStepMessage
                }`;
            });
            throw new Error(errorMessage);
        }

        return { success: true };
    };
