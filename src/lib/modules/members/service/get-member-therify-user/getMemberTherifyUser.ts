import { GetUserDetailsById } from '@/lib/modules/users/features';
import { TherifyUser } from '@/lib/shared/types';
import { MembersServiceParams } from '../params';

export const factory =
    ({ prisma }: MembersServiceParams) =>
    async ({
        userId,
    }: GetUserDetailsById.Input): Promise<{
        user: GetUserDetailsById.Output['user'];
    }> => {
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
                chatAccessToken: true,
                memberChannels: true,
                account: {
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
            },
        });

        if (!user) return { user: null };

        const {
            emailAddress,
            givenName,
            surname,
            createdAt,
            roles,
            accountId,
            account,
            memberChannels,
            chatAccessToken,
        } = user;

        const [newestPlan] = account?.plans ?? [];
        const plan = newestPlan
            ? {
                  ...newestPlan,
                  startDate: newestPlan.startDate.toISOString(),
                  endDate: newestPlan.endDate.toISOString(),
              }
            : null;

        return {
            user: TherifyUser.validate({
                emailAddress,
                givenName,
                surname,
                chatAccessToken,
                memberChannels,
                createdAt: createdAt.toISOString(),
                roles,
                accountId,
                userId,
                plan,
                isPracticeAdmin: false,
            }),
        };
    };
