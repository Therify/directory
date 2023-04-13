import { membersService } from '@/lib/modules/members/service';
import { ProvidersService } from '@/lib/modules/providers/service';
import { GetUserDetailsById } from '@/lib/modules/users/features';
import { Role } from '@prisma/client';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        userId,
    }: GetUserDetailsById.Input): Promise<
        Omit<GetUserDetailsById.Output, 'firebaseToken' | 'errors'>
    > => {
        const { roles } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                roles: true,
            },
        });
        const isProvider = ['provider_coach, provider_therapist'].some(
            (providerRole) => roles.includes(providerRole as Role)
        );
        if (isProvider) {
            return await ProvidersService.getTherifyUser({ userId });
        }
        return await membersService.getTherifyUser({ userId });
    };
