import { HandleReimbursementSubmission } from '@/lib/modules/accounts/features/billing';
import { CoveredSessionStatus } from '@prisma/client';
import { HandleReimbursementSubmissionTransaction } from './definition';

interface GetTherifyUserDetailsFactory {
    (
        params: HandleReimbursementSubmission.Input
    ): HandleReimbursementSubmissionTransaction['claimSession'];
}
export const factory: GetTherifyUserDetailsFactory = ({ submissionId }) => ({
    async commit(
        { prisma },
        {
            getMemberDetails: { memberId, planId },
            getProviderDetails: { providerProfileId },
        }
    ) {
        const { id } = await prisma.coveredSession.create({
            data: {
                planId,
                memberId,
                profileId: providerProfileId,
                status: CoveredSessionStatus.claimed,
                jotformSubmissionId: submissionId,
            },
        });

        return {
            coveredSessionId: id,
        };
    },
    async rollback({ prisma }, { claimSession: { coveredSessionId } }) {
        return prisma.coveredSession.delete({
            where: {
                id: coveredSessionId,
            },
        });
    },
});
