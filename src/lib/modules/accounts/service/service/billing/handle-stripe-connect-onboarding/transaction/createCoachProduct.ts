import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { HandleStripeConnectOnboardingTransaction } from './definition';
interface CreateCoachProductFactory {
    (
        params: HandleStripeConnectOnboarding.Input
    ): HandleStripeConnectOnboardingTransaction['createCoachProduct'];
}

export const factory: CreateCoachProductFactory = ({
    userId: therifyUserId,
}) => ({
    async commit(
        { stripe },
        {
            getUserDetails: {
                providerProfile: {
                    minimumRate: sessionRate,
                    givenName,
                    surname,
                },
            },
        }
    ) {
        const price = await stripe.createPrice({
            currency: 'USD',
            unitAmountInCents: sessionRate * 100,
            active: true,
            metadata: {
                therify_user_id: therifyUserId,
            },
            productData: {
                name: `Therify Coaching Session with ${givenName} ${surname}`,
                active: true,
                metadata: {
                    therify_user_id: therifyUserId,
                },
            },
        });

        return { priceId: price.id };
    },
    async rollback({ stripe }, { createCoachProduct: { priceId } }) {
        return await stripe.archivePrice(priceId);
    },
});
