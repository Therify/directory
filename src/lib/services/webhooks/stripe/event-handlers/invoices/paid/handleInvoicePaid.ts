import Stripe from 'stripe';
import { StripeWebhookParams } from '../../../webhookParams';
import { inferAsyncReturnType } from '@trpc/server';
import { Types } from '@/lib/vendors/stripe';
import {
    handleGroupPracticePayment,
    handleSubscriptionChange,
} from './handlers';

type HandlerResult = inferAsyncReturnType<
    typeof handleGroupPracticePayment | typeof handleSubscriptionChange
>;

export const handleInvoicePaidFactory =
    ({ accounts }: StripeWebhookParams) =>
    async (rawInvoice: unknown) => {
        // const invoice = Types.stripeInvoiceSchema.parse(rawInvoice);
        console.log('handleInvoicePaidFactory', rawInvoice);
        // const customerId = StripeUtils.extractIdFromExpandableField(
        //     rawInvoice,
        //     'customer'
        // );
        // if (!customerId) {
        //     throw new Error('No customer id found on invoice');
        // }
        // const billingReason = rawInvoice.billing_reason;
        // if (!StripeUtils.isSupportedBillingReason(billingReason)) {
        //     throw new Error(`Unexpected billing reason: ${billingReason}`);
        // }

        // const [lineItem] = invoice.lineItems;
        // // TODO: Handle multiple line items
        // if (lineItem.price?.therifyProductId === undefined) {
        //     throw new Error('No therify product id found in invoice line item');
        // }

        // const { therifyProductId } = lineItem.price;
        // const isSubscriptionChange = billingReason === 'subscription_update';
        // const isEnterpriseSubscription =
        //     Product.Subscriptions.Types.isEnterpriseSubscriptionConfig(
        //         Product.getSubscriptionConfig(therifyProductId)
        //     );
        // let result: HandlerResult;
        // if (isSubscriptionChange) {
        //     result = await handleSubscriptionChange({
        //         accounts,
        //         customerId,
        //         invoice,
        //     });
        // } else if (isEnterpriseSubscription) {
        //     result = await handleEnterpriseSubscriptionPayment({
        //         accounts,
        //         customerId,
        //         invoice,
        //         productId: therifyProductId,
        //     });
        // } else {
        //     result = await handleIndividualSubscriptionPayment({
        //         accounts,
        //         customerId,
        //         invoice,
        //         productId: therifyProductId,
        //         startDate: lineItem.periodStart,
        //         endDate: lineItem.periodEnd,
        //     });
        // }

        // if (result.isErr()) {
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
