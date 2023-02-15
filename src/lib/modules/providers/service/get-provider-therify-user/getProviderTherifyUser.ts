import { TherifyUser } from '@/lib/shared/types';
import { ProvidersServiceParams } from '../params';
import { GetProviderTherifyUser } from '../../features/providers';

export const factory =
    ({ prisma }: ProvidersServiceParams) =>
    async ({
        userId,
    }: GetProviderTherifyUser.Input): Promise<
        GetProviderTherifyUser.Output['user'] | null
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
                providerProfile: {
                    select: {
                        profileImageUrl: true,
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
            },
        });

        if (!user) return null;

        const {
            practiceProvider,
            providerProfile,
            emailAddress,
            givenName,
            surname,
            createdAt,
            roles,
            accountId,
        } = user;
        const { practiceOwnerId, plans } = practiceProvider?.practice ?? {};
        const plan = plans?.[0];

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
            plan: plan
                ? {
                      ...plan,
                      startDate: plan.startDate.toISOString(),
                      endDate: plan.endDate.toISOString(),
                  }
                : null,
            isPracticeAdmin: practiceOwnerId && practiceOwnerId === userId,
        });
    };
