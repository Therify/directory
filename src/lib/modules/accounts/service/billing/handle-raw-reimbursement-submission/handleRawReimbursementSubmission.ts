import { HandleRawReimbursementSubmission } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';
import { getMemberId } from './getMemberId';
import { getConnectionDetails } from './getConnectionDetails';
import { getPlanForMember } from './getPlanForMember';
import { RedeemedSessionStatus } from '@prisma/client';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        provider,
        dateOfSession,
        memberEmail,
        submissionId,
    }: HandleRawReimbursementSubmission.Input) => {
        const { memberId } = await getMemberId(memberEmail, prisma);
        const { practiceId, providerProfileId } = await getConnectionDetails({
            memberId,
            provider,
            prisma,
        });
        const planId = await getPlanForMember(
            { memberId, dateOfSession },
            prisma
        );
        const redeemedSession = await prisma.redeemedSession.create({
            data: {
                dateOfSession,
                memberId,
                ...(providerProfileId ? { profileId: providerProfileId } : {}),
                ...(practiceId ? { practiceId } : {}),
                jotformSubmissionId: submissionId,
                planId,
                status: RedeemedSessionStatus.claimed,
            },
        });
        return redeemedSession;
    };
