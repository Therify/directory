import { TRANSACTION_STEPS, RegisterMemberTransaction } from './definition';

export const updateUserEntity: RegisterMemberTransaction['UPDATE_THERIFY_USER_ENTRY'] =
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
