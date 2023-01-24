import { GetPracticeByUserId } from '@/lib/features/users';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        auth0Id,
    }: GetPracticeByUserId.Input): Promise<{
        practice: GetPracticeByUserId.Output['practice'];
    }> => {
        const { practice } = await prisma.user.findUniqueOrThrow({
            where: {
                auth0Id,
            },
            select: {
                practice: true,
            },
        });

        return {
            practice,
        };
    };
