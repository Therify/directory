import { StripeWebhookParams } from '../../../webhookParams';
import { inferAsyncReturnType } from '@trpc/server';
import { StripeInvoice, StripeUtils } from '@/lib/vendors/stripe';
import {
    handleGroupPracticePayment,
    handleSubscriptionChange,
} from './handlers';
import { getProductByEnvironment, isValidPriceId, PRODUCTS } from '@/lib/types';

type HandlerResult = inferAsyncReturnType<
    typeof handleGroupPracticePayment | typeof handleSubscriptionChange
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
        const { customer: customerId, billing_reason } = invoice;
        if (!customerId) {
            throw new Error('No customer id found on invoice');
        }

        if (!StripeUtils.isSupportedBillingReason(billing_reason)) {
            throw new Error(`Unexpected billing reason: ${billing_reason}`);
        }

        const [lineItem] = invoice.lines.data;
        if (!isValidPriceId(lineItem.price.id, process.env.NODE_ENV)) {
            throw new Error(`Unexpected price id: ${lineItem.price.id}`);
        }

        const isSubscriptionChange = billing_reason === 'subscription_update';

        let result: HandlerResult | undefined = undefined;
        if (isSubscriptionChange) {
            result = await handleSubscriptionChange({
                accounts,
                customerId,
                invoice,
            });
        } else if (
            Object.values(GROUP_PRACTICE_PLAN.PRICES).includes(
                lineItem.price.id
            )
        ) {
            result = await handleGroupPracticePayment({
                seats: lineItem.quantity,
                accounts,
                customerId,
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

        // if (result?.isErr()) {
        //     let errorMessage = 'Could not handle invoice payment';
        //     result.mapErr(([errorStep, error]) => {
        //         const message = (error as Error)?.message;
        //         const failedStepMessage = `Failed on step: ${errorStep} for billing reason: ${billingReason} and product id: ${therifyProductId}`;
        //         errorMessage = `[handleSubscriptionPayment error]: ${
        //             message ?? failedStepMessage
        //         }`;
        //     });
        //     throw new Error(errorMessage);
        // }

        return { success: true };
    };
