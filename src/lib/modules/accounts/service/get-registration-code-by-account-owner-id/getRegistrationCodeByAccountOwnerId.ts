import { AccountsServiceParams } from '../params';
import { GetRegistrationCodeByAccountOwnerId } from '../../features';

export const factory = ({ prisma }: AccountsServiceParams) => {
    return async function ({
        ownerId,
    }: GetRegistrationCodeByAccountOwnerId.Input): Promise<GetRegistrationCodeByAccountOwnerId.Output> {
        const account = await prisma.account.findUnique({
            where: {
                accountOwnerId: ownerId,
            },
            select: {
                registrationCode: true,
            },
        });
        const [code] = account?.registrationCode ?? [];
        return {
            registrationCode: code?.id ?? null,
        };
    };
};
