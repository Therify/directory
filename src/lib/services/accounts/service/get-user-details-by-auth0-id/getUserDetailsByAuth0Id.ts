import { GetUserDetailsByAuth0Id } from '@/lib/features/users';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async (
        input: GetUserDetailsByAuth0Id.Input
    ): Promise<Omit<GetUserDetailsByAuth0Id.Output, 'errors'>> => {
        const {
            plans,
            id: userId,
            emailAddress,
            roles,
            accountId,
        } = await prisma.user.findUniqueOrThrow({
            where: {
                auth0Id: input.auth0Id,
            },
            select: {
                id: true,
                emailAddress: true,
                roles: true,
                accountId: true,
                plans: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                    select: {
                        seats: true,
                        status: true,
                        endDate: true,
                        renews: true,
                    },
                },
            },
        });
        const [newestPlan] = plans;

        return {
            details: {
                plan: newestPlan
                    ? {
                          status: newestPlan?.status,
                          endDate: newestPlan.endDate,
                          renews: newestPlan.renews,
                          seats: newestPlan.seats,
                      }
                    : null,
                user: {
                    userId,
                    email: emailAddress,
                    roles,
                    accountId,
                },
            },
        };
    };
