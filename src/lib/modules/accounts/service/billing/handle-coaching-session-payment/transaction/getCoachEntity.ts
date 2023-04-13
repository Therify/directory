import { PlanStatus } from '@prisma/client';
import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { HandleCoachingSessionPaymentTransaction } from './definition';

interface GetCoachEntityFactory {
    (
        params: HandleCoachingSessionPayment.Input
    ): HandleCoachingSessionPaymentTransaction['getCoachEntity'];
}

export const factory: GetCoachEntityFactory = ({ priceId }) => ({
    async commit({ prisma }) {
        const { user } = await prisma.providerProfile.findUniqueOrThrow({
            where: {
                stripeSessionPriceId: priceId,
            },
            select: {
                user: true,
            },
        });
        if (!user) {
            throw new Error('No coach found for price id');
        }
        return { id: user.id, givenName: user.givenName };
    },
    async rollback() {
        return;
    },
});
