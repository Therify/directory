import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { CreatePracticeProviderInvitationTransaction } from './definition';

export const factory: (
    input: CreatePracticeProviderInvitation.Input
) => CreatePracticeProviderInvitationTransaction['getPractice'] = ({
    senderId,
}) => {
    return {
        async commit({ prisma }) {
            const { managedPractice } = await prisma.user.findUniqueOrThrow({
                where: { id: senderId },
                select: {
                    managedPractice: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            if (!managedPractice)
                throw new Error('User is not a practice admin');
            return {
                practiceId: managedPractice.id,
                practiceName: managedPractice.name,
            };
        },
        rollback() {},
    };
};
