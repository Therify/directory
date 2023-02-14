import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { InvitationStatus } from '@prisma/client';
import { addDays } from 'date-fns';
import { CreatePracticeProviderInvitationTransaction } from './definition';

export const factory: (
    input: CreatePracticeProviderInvitation.Input
) => CreatePracticeProviderInvitationTransaction['createInvitation'] = ({
    expiresInDays,
    ...input
}) => {
    return {
        async commit({ prisma }) {
            const { id: invitationId } =
                await prisma.practiceProviderInvitation.create({
                    data: {
                        ...input,
                        status: InvitationStatus.pending,
                        expiresAt:
                            expiresInDays !== undefined && expiresInDays > 0
                                ? addDays(new Date(), expiresInDays)
                                : undefined,
                    },
                });
            return {
                invitationId,
            };
        },
        rollback({ prisma }, { createInvitation: { invitationId } }) {
            return prisma.practiceProviderInvitation.delete({
                where: { id: invitationId },
            });
        },
    };
};
