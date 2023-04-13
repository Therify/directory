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
        const { id } = await prisma.providerProfile.findUniqueOrThrow({
            where: { id: providerProfileId },
            select: {
                id: true,
            },
        });

        return {
            providerProfileId: id,
        };
    },
    async rollback() {
        return;
    },
});
