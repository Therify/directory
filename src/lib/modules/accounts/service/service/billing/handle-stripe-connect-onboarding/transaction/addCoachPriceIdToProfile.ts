import { HandleStripeConnectOnboardingTransaction } from './definition';

export const step: HandleStripeConnectOnboardingTransaction['addCoachPriceIdToProfile'] =
    {
        async commit(
            { prisma },
            {
                getUserDetails: {
                    providerProfile: { id },
                },
                createCoachProduct: { priceId },
            }
        ) {
            await prisma.providerProfile.update({
                where: { id },
                data: {
                    stripeSessionPriceId: priceId,
                },
            });

            return;
        },
        async rollback(
            { prisma },
            {
                getUserDetails: {
                    providerProfile: { id },
                },
            }
        ) {
            return await prisma.providerProfile.update({
                where: { id },
                data: {
                    stripeSessionPriceId: null,
                },
            });
        },
    };
