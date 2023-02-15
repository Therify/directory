import { HandleGroupPracticePlanPayment } from '@/lib/modules/accounts/features/billing';
import { HandleGroupPracticePlanPaymentTransaction } from './definition';

interface GetTherifyIdentifiersFactory {
    (
        params: HandleGroupPracticePlanPayment.Input
    ): HandleGroupPracticePlanPaymentTransaction['getPractice'];
}

export const factory: GetTherifyIdentifiersFactory = ({
    stripeCustomerId,
}) => ({
    async commit({ prisma }) {
        const { managedPractice, id: practiceOwnerId } =
            await prisma.user.findUniqueOrThrow({
                where: { stripeCustomerId },
                select: {
                    id: true,
                    managedPractice: { select: { id: true } },
                },
            });
        const practiceId = managedPractice?.id;
        if (!practiceId) {
            throw new Error('No practice found for customer.');
        }
        return { practiceId, practiceOwnerId };
    },
    async rollback() {
        return;
    },
});
