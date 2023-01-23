import { StripeWebhookParams } from '../../../webhookParams';
import { inferAsyncReturnType } from '@trpc/server';
import { StripeInvoice, StripeUtils } from '@/lib/vendors/stripe';
import { handleGroupPracticePayment, handlePlanChange } from './handlers';
import { getProductByEnvironment, isValidPriceId, PRODUCTS } from '@/lib/types';

type HandlerResult = inferAsyncReturnType<
    typeof handleGroupPracticePayment | typeof handlePlanChange
>;

const GROUP_PRACTICE_PLAN = getProductByEnvironment(
    PRODUCTS.GROUP_PRACTICE_PLAN,
    process.env.NODE_ENV
);

export const handleInvoicePaidFactory =
    ({ accounts }: StripeWebhookParams) =>
    async (rawInvoice: unknown) => {
        console.log('handleInvoicePaidFactory', rawInvoice);
        const invoice = StripeInvoice.schema.parse(rawInvoice);
        const {
            customer: customerId,
            subscription: subscriptionId,
            billing_reason,
        } = invoice;
        if (!customerId) {
            throw new Error('No customer id found on invoice');
        }

        if (subscriptionId === null) {
            throw new Error(`No Stripe subscription id found on invoice.`);
        }

        if (!StripeUtils.isSupportedBillingReason(billing_reason)) {
            throw new Error(`Unexpected billing reason: ${billing_reason}`);
        }

        const [lineItem] = invoice.lines.data;
        if (!isValidPriceId(lineItem.price.id, process.env.NODE_ENV)) {
            throw new Error(`Unexpected price id: ${lineItem.price.id}`);
        }

        const isSubscriptionChange = billing_reason === 'subscription_update';
        const isGroupPracticePlanPriceId = Object.values(
            GROUP_PRACTICE_PLAN.PRICES
        ).includes(lineItem.price.id);

        let result: HandlerResult | undefined = undefined;
        if (isSubscriptionChange) {
            result = await handlePlanChange({
                accounts,
                customerId,
                subscriptionId,
                invoice,
            });
        } else if (isGroupPracticePlanPriceId) {
            result = await handleGroupPracticePayment({
                seats: lineItem.quantity,
                accounts,
                customerId,
                subscriptionId,
                invoice,
                priceId: lineItem.price.id,
                startDate: StripeUtils.getDateFromStripeTimestamp(
                    lineItem.period.start
                ).toISOString(),
                endDate: StripeUtils.getDateFromStripeTimestamp(
                    lineItem.period.end
                ).toISOString(),
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
