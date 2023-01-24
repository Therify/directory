import { RegisterProviderTransaction } from './definition';

export const step: RegisterProviderTransaction['updateUserEntity'] = {
    async commit(
        { prisma },
        {
            createStripeCustomer: { customerId: stripeCustomerId },
            createTherifyUserEntity: { therifyUserId: id },
            createAuth0User: { auth0UserId: auth0Id },
        }
    ) {
        const { id: userBillingProviderEntityId } = await prisma.user.update({
            where: { id },
            data: {
                stripeCustomerId,
                auth0Id,
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
