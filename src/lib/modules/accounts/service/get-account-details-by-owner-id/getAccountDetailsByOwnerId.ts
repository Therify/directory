import { GetAccountDetailsByOwnerId } from '@/lib/modules/accounts/features';

import { AccountsServiceParams } from '../params';
import { URL_PATHS } from '@/lib/sitemap';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        ownerId,
    }: GetAccountDetailsByOwnerId.Input): Promise<
        Omit<GetAccountDetailsByOwnerId.Output, 'errors'>
    > => {
        const {
            name: accountName,
            users,
            plans,
            registrationCode,
        } = await prisma.account.findUniqueOrThrow({
            where: {
                accountOwnerId: ownerId,
            },
            select: {
                name: true,
                users: true,
                registrationCode: true,
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
                        coveredSessions: true,
                    },
                },
            },
        });

        const [code] = registrationCode;
        const [plan] = plans;
        const registrationLink = code?.id
            ? `${process.env.APPLICATION_URL}${URL_PATHS.MEMBERS.REGISTER}?registrationCode=${code.id}`
            : null;
        return {
            accountName,
            claimedSeats: users.length,
            totalSeats: plan?.seats ?? 0,
            coveredSessions: plan?.coveredSessions ?? 0,
            registrationLink,
            hasAvailableSeats: users.length < (plan?.seats ?? 0),
        };
    };
