import { StripeInvoice } from '@/lib/shared/vendors/stripe';
import { StripeWebhookParams } from '../../../webhookParams';

export const handleInvoiceUpdatedFactory =
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
        if (invoice.billing_reason === 'manual') {
            // this is a coaching session invoice
            const { sessionInvoiceId } =
                await accounts.billing.handleCoachingSessionInvoiceUpdated({
                    customerId: invoice.customer,
                    priceId,
                    invoice,
                });
            return { success: !!sessionInvoiceId };
        }
        // this not a coaching session invoice
        return { success: true };
    };
