import { ProvidersServiceParams } from '../../params';
import { DeletePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';

export function factory({ prisma }: ProvidersServiceParams) {
    return async function ({
        userId,
        invitationId,
    }: DeletePracticeProviderInvitation.Input): Promise<{
        success: DeletePracticeProviderInvitation.Output['success'];
    }> {
        const invitation =
            await prisma.practiceProviderInvitation.findFirstOrThrow({
                where: {
                    id: invitationId,
                    senderId: userId,
                    practice: {
                        practiceOwnerId: userId,
                    },
                },
                select: {
                    id: true,
                },
            });

        await prisma.practiceProviderInvitation.delete({
            where: { id: invitation.id },
        });

        return {
            success: true,
        };
    };
}
