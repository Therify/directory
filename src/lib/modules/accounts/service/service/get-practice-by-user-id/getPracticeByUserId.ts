import { GetPracticeByUserId } from '@/lib/modules/users/features';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        userId,
    }: GetPracticeByUserId.Input): Promise<{
        practice: GetPracticeByUserId.Output['practice'];
    }> => {
        const { managedPractice: practice } =
            await prisma.user.findUniqueOrThrow({
                where: {
                    id: userId,
                },
                select: {
                    managedPractice: true,
                },
            });

        return {
            practice,
        };
    };
