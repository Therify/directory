import { HandleReimbursementSubmission } from '@/lib/modules/accounts/features/billing';
import { RedeemedSessionStatus } from '@prisma/client';
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
            getMemberDetails: { memberId, planId, dateOfSession },
            getProviderDetails: { providerProfileId },
        }
    ) {
        const { id } = await prisma.redeemedSession.create({
            data: {
                planId,
                memberId,
                profileId: providerProfileId,
                status: RedeemedSessionStatus.claimed,
                jotformSubmissionId: submissionId,
                dateOfSession,
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
