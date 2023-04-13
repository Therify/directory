import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { HandleCoachingSessionPaymentTransaction } from './definition';

interface GetMemberEntityFactory {
    (
        params: HandleCoachingSessionPayment.Input
    ): HandleCoachingSessionPaymentTransaction['getMemberEntity'];
}

export const factory: GetMemberEntityFactory = ({ stripeCustomerId }) => ({
    async commit({ prisma }) {
        const { id, givenName } = await prisma.user.findUniqueOrThrow({
            where: {
                stripeCustomerId,
            },
            select: {
                id: true,
                givenName: true,
            },
        });

        return { id, givenName };
    },
    async rollback() {
        return;
    },
});
