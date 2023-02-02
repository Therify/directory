import { GetUserDetailsByAuth0Id } from '@/lib/features/users';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        auth0Id,
    }: GetUserDetailsByAuth0Id.Input): Promise<
        Omit<GetUserDetailsByAuth0Id.Output, 'firebaseToken' | 'errors'>
    > => {
        const {
            plans,
            id: userId,
            ...user
        } = await prisma.user.findUniqueOrThrow({
            where: {
                auth0Id,
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
                auth0Id,
                isPracticeAdmin: userId === newestPlan?.billingUserId,
                plan: newestPlan ?? null,
            },
        };
    };
