import { StripeVendorFactoryParams } from '../types';

export interface SendInvoiceFactoryParams extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: SendInvoiceFactoryParams) =>
    async (invoiceId: string): Promise<{ sent: true }> => {
        await stripe.invoices.sendInvoice(invoiceId);

        return { sent: true };
    };
