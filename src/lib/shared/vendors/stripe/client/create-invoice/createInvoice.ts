import { StripeInvoice } from '../../types';
import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateInvoiceFactoryParams extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateInvoiceFactoryParams) =>
    async ({
        customerId,
        priceId,
        quantity = 1,
        daysUntilDue = 1,
        connectedAccountData,
        metadata,
        lineItemDescription,
    }: Input): Promise<Output> => {
        const invoice = await stripe.invoices.create({
            customer: customerId,
            collection_method: 'send_invoice',
            days_until_due: daysUntilDue,
            metadata,
            ...(connectedAccountData
                ? {
                      application_fee_amount:
                          connectedAccountData.applicationFeeInCents,
                      transfer_data: {
                          destination:
                              connectedAccountData.stripeConnectAccountId,
                      },
                  }
                : {}),
        });

        await stripe.invoiceItems.create({
            customer: customerId,
            price: priceId,
            description: lineItemDescription,
            quantity,
            invoice: invoice.id,
        });
        return StripeInvoice.validate(invoice);
    };
