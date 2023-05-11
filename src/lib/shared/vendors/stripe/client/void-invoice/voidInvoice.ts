import { StripeVendorFactoryParams } from '../types';

export interface SendInvoiceFactoryParams extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: SendInvoiceFactoryParams) =>
    async (invoiceId: string): Promise<{ voided: true }> => {
        await stripe.invoices.voidInvoice(invoiceId);
        return { voided: true };
    };
