import { BillingProvider } from '@therify/concepts';

import { RegisterProviderTransaction } from './definition';

export const step: RegisterProviderTransaction['createUserBillingProviderIdEntity'] =
    {
        async commit(
            { orm },
            {
                createStripeCustomer: { customerId },
                createTherifyUserEntity: { therifyUserId },
            }
        ) {
            const { id: userBillingProviderEntityId } =
                await orm.userBillingProviderIdentifier.create({
                    data: {
                        userId: therifyUserId,
                        customerId,
                        billingProviderId: BillingProvider.Stripe.id,
                    },
                });
            return {
                userBillingProviderEntityId,
            };
        },
        async rollback(
            { orm },
            {
                createUserBillingProviderIdEntity: {
                    userBillingProviderEntityId,
                },
            }
        ) {
            return orm.userBillingProviderIdentifier.delete({
                where: { id: userBillingProviderEntityId },
            });
        },
    };
