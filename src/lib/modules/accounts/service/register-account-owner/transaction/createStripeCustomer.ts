import { RegisterAccountOwner, TRANSACTION_STEPS } from './definition';

export const createStripeCustomer: RegisterAccountOwner['CREATE_STRIPE_CUSTOMER'] =
    {
        async commit(
            { givenName, surname, emailAddress: email },
            { stripe },
            {
                [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: {
                    therifyUserId: therify_user_id,
                },
            }
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
        async rollback(
            _,
            { stripe },
            { [TRANSACTION_STEPS.CREATE_STRIPE_CUSTOMER]: { customerId } }
        ) {
            stripe.deleteCustomer({ customerId });
        },
    };
