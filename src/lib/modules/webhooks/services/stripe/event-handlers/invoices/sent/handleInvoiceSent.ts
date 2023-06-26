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
        if (!invoice.metadata.dateOfSession) {
            // App generated coaching invoices will have a dateOfSession metadata field
            // If it's not present, we can assume it's an invoice generated from the dashboard
            // and can be ignored.
            //TODO: Remove this once we're no longer using the Stripe dashboard
            // to generate coaching invoices
            return { success: true };
        }
        const { sentMessage } = await accounts.billing.handleInvoiceSent({
            customerId: invoice.customer,
            priceId,
            invoice,
        });
        return { success: sentMessage };
    };
