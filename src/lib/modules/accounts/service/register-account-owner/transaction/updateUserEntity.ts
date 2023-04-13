import { TRANSACTION_STEPS, RegisterAccountOwner } from './definition';

export const updateUserEntity: RegisterAccountOwner['UPDATE_THERIFY_USER_ENTRY'] =
    {
        async commit(
            _,
            { orm },
            {
                [TRANSACTION_STEPS.CREATE_STRIPE_CUSTOMER]: {
                    customerId: stripeCustomerId,
                },
                [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: {
                    therifyUserId: id,
                },
            }
        ) {
            const { id: userBillingProviderEntityId } = await orm.user.update({
                where: { id },
                data: {
                    stripeCustomerId,
                },
            });
            return {
                userBillingProviderEntityId,
            };
        },
        async rollback() {
            return;
        },
    };
