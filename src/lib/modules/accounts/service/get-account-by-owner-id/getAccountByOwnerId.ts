import { AccountsServiceParams } from '../params';
import { GetAccountByOwnerId } from '../../features';

export const factory = ({ prisma }: AccountsServiceParams) => {
    return async function getAccountByOwnerId({
        ownerId,
    }: GetAccountByOwnerId.Input): Promise<GetAccountByOwnerId.Output> {
        const account = await prisma.account.findUnique({
            where: {
                accountOwnerId: ownerId,
            },
        });
        return account;
    };
};
