import { GetUserDetailsById } from '@/lib/modules/users/features';
import { TherifyUser } from '@/lib/shared/types';
import { ProvidersServiceParams } from '../params';

export const factory =
    ({ prisma }: ProvidersServiceParams) =>
    async ({
        userId,
    }: GetUserDetailsById.Input): Promise<
        GetUserDetailsById.Output['user']
    > => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                emailAddress: true,
                givenName: true,
                surname: true,
                createdAt: true,
                roles: true,
                accountId: true,
                managedPractice: {
                    select: {
                        plans: {
                            orderBy: {
                                createdAt: 'desc',
                            },
                            take: 1,
                            select: {
                                status: true,
                                startDate: true,
                                endDate: true,
                                renews: true,
                                seats: true,
                            },
                        },
                    },
                },
                practiceProvider: {
                    select: {
                        practice: {
                            select: {
                                practiceOwnerId: true,
                                plans: {
                                    orderBy: {
                                        createdAt: 'desc',
                                    },
                                    take: 1,
                                    select: {
                                        status: true,
                                        startDate: true,
                                        endDate: true,
                                        renews: true,
                                        seats: true,
                                    },
                                },
                            },
                        },
                    },
                },
                providerProfile: {
                    select: {
                        profileImageUrl: true,
                    },
                },
            },
        });

        if (!user) return null;

        const {
            providerProfile,
            emailAddress,
            givenName,
            surname,
            createdAt,
            roles,
            accountId,
            managedPractice,
            practiceProvider,
        } = user;

        let plan: TherifyUser.TherifyUser['plan'] = null;
        let isPracticeAdmin = false;

        if (managedPractice) {
            isPracticeAdmin = true;
            const { plans } = managedPractice;
            const [newestPlan] = plans;
            if (newestPlan) {
                plan = {
                    ...newestPlan,
                    startDate: newestPlan.startDate.toISOString(),
                    endDate: newestPlan.endDate.toISOString(),
                };
            }
        }

        if (practiceProvider) {
            const {
                practice: { practiceOwnerId, plans },
            } = practiceProvider;
            isPracticeAdmin =
                Boolean(practiceOwnerId) && userId === practiceOwnerId;
            const newestPlan = plans?.[0];
            if (newestPlan) {
                plan = {
                    ...newestPlan,
                    startDate: newestPlan.startDate.toISOString(),
                    endDate: newestPlan.endDate.toISOString(),
                };
            }
        }

        return TherifyUser.validate({
            providerProfile,
            emailAddress,
            givenName,
            surname,
            createdAt: createdAt.toISOString(),
            roles,
            accountId,
            userId,
            avatarUrl: providerProfile?.profileImageUrl ?? undefined,
            plan,
            isPracticeAdmin,
        });
    };
