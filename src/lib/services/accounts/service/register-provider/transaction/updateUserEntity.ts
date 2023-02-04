import { RegisterProviderTransaction } from './definition';

export const step: RegisterProviderTransaction['updateUserEntity'] = {
    async commit(
        { prisma },
        {
            createStripeCustomer: { customerId: stripeCustomerId },
            createTherifyUserEntity: { therifyUserId: id },
        }
    ) {
        const { id: userBillingProviderEntityId } = await prisma.user.update({
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
