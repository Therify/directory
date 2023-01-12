import { RegisterProvider } from '@/lib/features/registration';

import { RegisterProviderTransaction } from './definition';

export const factory = ({
    providerDetails: { givenName, surname, emailAddress: customerEmail },
}: RegisterProvider.Input): RegisterProviderTransaction['createStripeCustomer'] => ({
    async commit({ stripe }, { createTherifyUserEntity: { therifyUserId } }) {
        const { customerId } = await stripe.createCustomer({
            customerName: `${givenName} ${surname}`,
            customerEmail,
            therifyUserId,
        });
        return {
            customerId,
        };
    },
    async rollback({ stripe }, { createStripeCustomer: { customerId } }) {
        return stripe.deleteCustomer({ customerId });
    },
});
