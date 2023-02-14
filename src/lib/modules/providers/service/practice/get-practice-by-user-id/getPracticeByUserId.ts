import { GetPracticeByUserId } from '@/lib/modules/providers/features/practice';
import { ProviderPractice } from '@/lib/shared/types';
import { ProvidersServiceParams } from '../../params';

export const factory =
    ({ prisma }: ProvidersServiceParams) =>
    async ({
        userId,
    }: GetPracticeByUserId.Input): Promise<{
        practice: GetPracticeByUserId.Output['practice'];
    }> => {
        const practice = await prisma.practice.findUniqueOrThrow({
            where: {
                userId,
            },
        });

        return JSON.parse(
            JSON.stringify({
                practice: ProviderPractice.validate(practice),
            })
        );
    };
