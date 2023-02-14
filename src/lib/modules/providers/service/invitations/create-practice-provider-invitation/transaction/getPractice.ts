import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { CreatePracticeProviderInvitationTransaction } from './definition';

export const factory: (
    input: CreatePracticeProviderInvitation.Input
) => CreatePracticeProviderInvitationTransaction['getPractice'] = ({
    senderId,
}) => {
    return {
        async commit({ prisma }) {
            const { practice } = await prisma.user.findUniqueOrThrow({
                where: { id: senderId },
                select: {
                    practice: true,
                },
            });
            if (!practice) throw new Error('User is not a practice admin');
            return {
                practiceId: practice.id,
            };
        },
        rollback() {},
    };
};
