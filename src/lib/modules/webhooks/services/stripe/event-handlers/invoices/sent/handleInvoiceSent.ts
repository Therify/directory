import { StripeInvoice } from '@/lib/shared/vendors/stripe';
import { StripeWebhookParams } from '../../../webhookParams';

export const handleInvoiceSentFactory =
    ({ accounts }: StripeWebhookParams) =>
    async (rawInvoice: unknown) => {
        const invoice = StripeInvoice.schema.parse(rawInvoice);
        const [lineItem] = invoice.lines.data;
        const priceId = lineItem?.price.id;
        if (!invoice.customer) {
            throw new Error('No customer id found on invoice');
        }
        if (!priceId) {
            throw new Error('No price id found on invoice');
        }
        return await accounts.billing.handleInvoiceSent({
            customerId: invoice.customer,
            priceId,
            invoice,
        });
    };
