import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';
import type { HandleAccountOnboardingTransaction } from './definition';

interface HandlePracticeOnboardingEntityFactory {
    (
        params: HandleAccountOnboarding.Input
    ): HandleAccountOnboardingTransaction['handleAccountEntity'];
}

export const factory: HandlePracticeOnboardingEntityFactory = ({
    name,
    accountId,
}) => {
    if (name.toLowerCase().includes('therify')) {
        throw new Error('Account name cannot include "Therify"');
    }
    return {
        async commit({ prisma }, { getUserDetails: { userId } }) {
            if (accountId) {
                const { id: foundAccountId } = await prisma.account.update({
                    where: {
                        id: accountId,
                    },
                    data: {
                        name,
                    },
                });
                return {
                    accountId: foundAccountId,
                    created: false,
                };
            }
            const { id: createdAccountId } = await prisma.account.create({
                data: {
                    name,
                    accountOwnerId: userId,
                },
            });

            return {
                accountId: createdAccountId,
                created: true,
            };
        },
        rollback({ prisma }, { handleAccountEntity: { accountId, created } }) {
            if (created) {
                return prisma.practice.delete({
                    where: {
                        id: accountId,
                    },
                });
            }
        },
    };
};
