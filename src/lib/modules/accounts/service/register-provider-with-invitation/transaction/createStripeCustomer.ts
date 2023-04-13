import { RegisterProvider } from '@/lib/modules/registration/features';

import { RegisterProviderWithInvitationTransaction } from './definition';

export const factory = ({
    givenName,
    surname,
    emailAddress: email,
}: RegisterProvider.Input): RegisterProviderWithInvitationTransaction['createStripeCustomer'] => ({
    async commit(
        { stripe },
        { createTherifyUserEntity: { therifyUserId: therify_user_id } }
    ) {
        const { id: customerId } = await stripe.createCustomer({
            name: `${givenName} ${surname}`,
            email,
            metadata: {
                therify_user_id,
            },
        });
        return {
            customerId,
        };
    },
    async rollback({ stripe }, { createStripeCustomer: { customerId } }) {
        return stripe.deleteCustomer({ customerId });
    },
});
