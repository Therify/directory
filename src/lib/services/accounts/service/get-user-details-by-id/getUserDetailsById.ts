import { GetUserDetailsById } from '@/lib/features/users';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        userId,
    }: GetUserDetailsById.Input): Promise<
        Omit<GetUserDetailsById.Output, 'firebaseToken' | 'errors'>
    > => {
        const { plans, ...user } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                id: true,
                emailAddress: true,
                roles: true,
                accountId: true,
                createdAt: true,
                givenName: true,
                surname: true,
                plans: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                    select: {
                        billingUserId: true,
                        seats: true,
                        status: true,
                        startDate: true,
                        endDate: true,
                        renews: true,
                    },
                },
            },
        });
        const [newestPlan] = plans;

        return {
            user: {
                ...user,
                userId,
                isPracticeAdmin: userId === newestPlan?.billingUserId,
                plan: newestPlan
                    ? {
                          seats: newestPlan.seats,
                          status: newestPlan.status,
                          startDate: newestPlan.startDate,
                          endDate: newestPlan.endDate,
                          renews: newestPlan.renews,
                      }
                    : null,
            },
        };
    };
