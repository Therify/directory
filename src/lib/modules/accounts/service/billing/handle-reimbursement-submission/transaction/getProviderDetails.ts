import { HandleReimbursementSubmission } from '@/lib/modules/accounts/features/billing';
import { HandleReimbursementSubmissionTransaction } from './definition';

interface GetTherifyUserDetailsFactory {
    (
        params: HandleReimbursementSubmission.Input
    ): HandleReimbursementSubmissionTransaction['getProviderDetails'];
}

export const factory: GetTherifyUserDetailsFactory = ({
    providerProfileId,
}) => ({
    async commit({ prisma }) {
        const { id, practiceProfile } =
            await prisma.providerProfile.findUniqueOrThrow({
                where: { id: providerProfileId },
                select: {
                    id: true,
                    practiceProfile: {
                        select: {
                            practiceId: true,
                        },
                    },
                },
            });
        if (!practiceProfile?.practiceId) {
            throw new Error('Provider is not associated with a practice');
        }
        return {
            providerProfileId: id,
            practiceId: practiceProfile.practiceId,
        };
    },
    async rollback() {
        return;
    },
});
