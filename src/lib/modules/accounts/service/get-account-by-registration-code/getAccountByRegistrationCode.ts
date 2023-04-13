import { Account } from '@prisma/client';
import { AccountsServiceParams } from '../params';

interface GetAccountByRegistrationCodeParams {
    registrationCode: string;
}

interface GetAccountByRegistrationCodeFactory {
    (params: AccountsServiceParams): {
        (params: GetAccountByRegistrationCodeParams): Promise<{
            account: Account | null;
            hasSeatsAvailable: boolean;
        }>;
    };
}

export const factory: GetAccountByRegistrationCodeFactory = ({ prisma }) => {
    return async function getAccountByRegistrationCode({ registrationCode }) {
        const registrationCodeWithAccount =
            await prisma.registrationCode.findUnique({
                where: {
                    id: registrationCode,
                },
                include: {
                    account: true,
                },
            });
        if (!registrationCodeWithAccount)
            return {
                account: null,
                hasSeatsAvailable: false,
            };
        const users = await prisma.user.count({
            where: {
                accountId: registrationCodeWithAccount.accountId,
            },
        });
        const planSeats = await prisma.plan.findFirst({
            where: {
                accountId: registrationCodeWithAccount.accountId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 1,
        });
        const hasSeatsAvailable = planSeats ? users < planSeats.seats : true;
        const jsonSafeAccount = {
            ...registrationCodeWithAccount.account,
            createdAt:
                registrationCodeWithAccount.account.createdAt.toISOString(),
            updatedAt:
                registrationCodeWithAccount.account.updatedAt.toISOString(),
        };
        return {
            account: jsonSafeAccount as unknown as Account,
            hasSeatsAvailable,
        };
    };
};
