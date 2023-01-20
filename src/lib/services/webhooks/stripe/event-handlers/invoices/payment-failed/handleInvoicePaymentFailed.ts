import Stripe from 'stripe';
// import { StripeUtils } from '@/lib/vendors/stripe';
import { StripeWebhookParams } from '../../../webhookParams';

export const handleInvoicePaymentFailedFactory =
    ({ prisma }: StripeWebhookParams) =>
    async (rawInvoice: Stripe.Invoice) => {
        // const invoice = StripeUtils.adaptStripeInvoice(rawInvoice);
        // const subscription =
        //     await orm.subscriptionBillingProviderIdentifier.findFirst({
        //         where: {
        //             billingProviderSubscriptionId: invoice.subscriptionId,
        //             subscription: {
        //                 startDate: invoice.lineItems[0].periodStart,
        //                 endDate: invoice.lineItems[0].periodEnd,
        //             },
        //         },
        //     });
        // if (subscription) {
        //     await orm.subscription.update({
        //         where: {
        //             id: subscription.subscriptionId,
        //         },
        //         data: {
        //             status: 'Inactive',
        //         },
        //     });
        // }
        // Todo: Update the invoice? invoice.id type is reading as `any`
        // await orm.billingProviderInvoice.update({
        //     where: {
        //         invoiceId: invoice.id,
        //     },
        //     data: {
        //         status: invoice.status,
        //         ...(subscription ? { subscriptionId: subscription.id } : {}),
        //     },
        // });
        // TODO: Notify the member
    };
