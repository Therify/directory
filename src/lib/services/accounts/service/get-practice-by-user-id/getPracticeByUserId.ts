import { GetPracticeByUserId } from '@/lib/features/users';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        userId,
    }: GetPracticeByUserId.Input): Promise<{
        practice: GetPracticeByUserId.Output['practice'];
    }> => {
        const { practice } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                practice: true,
            },
        });

        return {
            practice,
        };
    };
