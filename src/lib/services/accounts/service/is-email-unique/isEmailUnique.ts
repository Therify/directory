import { IsEmailUnique } from '@/lib/features/users';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({ emailAddress }: IsEmailUnique.Input): Promise<boolean> => {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
            },
            where: {
                emailAddress,
            },
        });
        return !user;
    };
