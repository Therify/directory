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
        const [role] = roles;
        if (role === Role.provider_coach || role === Role.provider_therapist) {
            return ProvidersService.getProviderTherifyUser({ userId });
        }

        // TODO: get member therify user
        return { user: null };
    };
