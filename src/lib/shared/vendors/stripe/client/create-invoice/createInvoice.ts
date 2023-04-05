import Stripe from 'stripe';
import { StripeInvoice } from '../../types';
import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateInvoiceFactoryParams extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateInvoiceFactoryParams) =>
    async (input: Input): Promise<Output> => {
        const {
            customerId,
            priceId,
            quantity = 1,
            connectedAccountData,
            collectionMethod = 'send_invoice',
            metadata,
            lineItemDescription,
        } = input;
        let invoice: Stripe.Invoice = await stripe.invoices.create({
            customer: customerId,
            collection_method: collectionMethod,
            metadata,
            ...(input.collectionMethod === 'send_invoice'
                ? {
                      days_until_due: input.daysUntilDue,
                  }
                : {
                      auto_advance: input.autoAdvance,
                  }),
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

        if (
            input.collectionMethod === 'charge_automatically' &&
            input.shouldImmediatelyCharge
        ) {
            invoice = await stripe.invoices.finalizeInvoice(invoice.id);
            invoice = await stripe.invoices.pay(invoice.id);
        }

        if (
            input.collectionMethod === 'send_invoice' &&
            input.shouldSendEmail
        ) {
            invoice = await stripe.invoices.sendInvoice(invoice.id);
        }
        return StripeInvoice.validate(invoice);
    };
