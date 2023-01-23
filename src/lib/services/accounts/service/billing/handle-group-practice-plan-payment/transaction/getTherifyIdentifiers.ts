import { HandleGroupPracticePlanPayment } from '@/lib/features/accounts/billing';
import { HandleGroupPracticePlanPaymentTransaction } from './definition';

interface GetTherifyIdentifiersFactory {
    (
        params: HandleGroupPracticePlanPayment.Input
    ): HandleGroupPracticePlanPaymentTransaction['getTherifyIdentifiers'];
}

export const factory: GetTherifyIdentifiersFactory = ({
    stripeCustomerId,
}) => ({
    async commit({ prisma }) {
        const { id: therifyUserId } = await prisma.user.findUniqueOrThrow({
            where: { stripeCustomerId },
            select: { id: true },
        });
        return { therifyUserId };
    },
    async rollback() {
        return;
    },
});
