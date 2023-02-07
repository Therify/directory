import { getNodeEnvironmentConfiguration } from '@/lib/configuration';
import { CreateProviderProfileForPractice } from '@/lib/features/provider-profiles';
import { getRoleByEnvironment, Role } from '@/lib/types/roles';
import { CreateProviderProfileForPracticeTransaction } from './definition';

export const factory: (
    input: CreateProviderProfileForPractice.Input
) => CreateProviderProfileForPracticeTransaction['getPractice'] = ({
    userId,
}) => {
    return {
        async commit({ prisma }) {
            const { practice } = await prisma.user.findUniqueOrThrow({
                where: { id: userId },
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
