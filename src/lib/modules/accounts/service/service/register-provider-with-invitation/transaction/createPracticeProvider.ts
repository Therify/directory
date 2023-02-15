import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import type { RegisterProviderWithInitationTransaction } from './definition';

interface CreateTherifyUserEntityFactory {
    (
        params: RegisterProviderWithInvitation.Input
    ): RegisterProviderWithInitationTransaction['createPracticeProvider'];
}

export const factory: CreateTherifyUserEntityFactory = ({ invitationId }) => {
    return {
        async commit(
            { prisma },
            {
                getInvitation: { practiceId, profileId },
                createTherifyUserEntity: { therifyUserId },
            }
        ) {
            await prisma.practiceProvider.create({
                data: {
                    practiceId,
                    userId: therifyUserId,
                },
            });
            const { practiceProvider } = await prisma.user.findUniqueOrThrow({
                where: {
                    id: therifyUserId,
                },
                select: {
                    practiceProvider: {
                        select: {
                            practice: {
                                select: {
                                    plans: {
                                        orderBy: {
                                            createdAt: 'desc',
                                        },
                                        take: 1,
                                        select: {
                                            id: true,
                                            seats: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            const plan = practiceProvider?.practice?.plans[0];
            if (!plan) throw new Error('Failed to connect user to a plan.');
            if (!profileId) {
                const profilesCount = await prisma.practiceProfile.count({
                    where: {
                        practiceId,
                    },
                });

                if (profilesCount >= plan.seats) {
                    throw new Error(
                        'The plan for the practice is full. The practice administrator must upgrade their plan for you to register.'
                    );
                }
            }
            return {
                planId: plan.id,
            };
        },
        rollback(
            { prisma },
            {
                getInvitation: { practiceId },
                createTherifyUserEntity: { therifyUserId },
            }
        ) {
            return prisma.practiceProvider.delete({
                where: {
                    practiceId_userId: {
                        practiceId,
                        userId: therifyUserId,
                    },
                },
            });
        },
    };
};
