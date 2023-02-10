import { CreateProviderProfileForPractice } from '@/lib/modules/provider-profiles/features';
import { InvitationStatus, ListingStatus } from '@prisma/client';

import { CreateProviderProfileForPracticeTransaction } from './definition';

export const factory: (
    input: CreateProviderProfileForPractice.Input
) => CreateProviderProfileForPracticeTransaction['createPracticeProviderInvitation'] = ({
    invitationEmail,
    userId,
}) => {
    return {
        async commit(
            { prisma },
            {
                getPractice: { practiceId },
                createProviderProfile: { profileId },
            }
        ) {
            if (invitationEmail) {
                const { id: invitationId } =
                    await prisma.practiceProviderInvitation.create({
                        data: {
                            practiceId,
                            senderId: userId,
                            recipientEmail: invitationEmail,
                            profileId,
                            status: InvitationStatus.pending,
                        },
                    });
                return {
                    invitationId,
                };
            }

            return {};
        },
        rollback(
            { prisma },
            { createPracticeProviderInvitation: { invitationId } }
        ) {
            if (invitationId) {
                return prisma.practiceProviderInvitation.delete({
                    where: { id: invitationId },
                });
            }
        },
    };
};
