import { StripeVendorFactoryParams } from '../types';
import { Input, Output } from './schema';

export interface CreateAccountFactoryParams extends StripeVendorFactoryParams {}

export const factory =
    ({ stripe }: CreateAccountFactoryParams) =>
    async ({
        email,
        givenName: first_name,
        surname: last_name,
        dateOfBirth,
        therifyUserId: therify_user_id,
    }: Input): Promise<Output> => {
        const account = await stripe.accounts.create({
            country: 'US',
            type: 'express',
            email,
            individual: {
                email,
                first_name,
                last_name,
                dob: {
                    day: new Date(dateOfBirth).getDay(),
                    month: new Date(dateOfBirth).getMonth() + 1,
                    year: new Date(dateOfBirth).getFullYear(),
                },
                metadata: {
                    therify_user_id,
                },
            },
            capabilities: {
                card_payments: {
                    requested: true,
                },
                transfers: {
                    requested: true,
                },
            },
            tos_acceptance: { service_agreement: 'recipient' },
        });
        return { accountId: account.id };
    };
