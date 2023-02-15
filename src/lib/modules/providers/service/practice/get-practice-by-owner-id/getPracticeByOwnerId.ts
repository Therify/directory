import { GetPracticeByOwnerId } from '@/lib/modules/providers/features/practice';
import { ProviderPractice } from '@/lib/shared/types';
import { ProvidersServiceParams } from '../../params';

export const factory =
    ({ prisma }: ProvidersServiceParams) =>
    async ({
        userId,
    }: GetPracticeByOwnerId.Input): Promise<{
        practice: GetPracticeByOwnerId.Output['practice'];
    }> => {
        const practice = await prisma.practice.findUniqueOrThrow({
            where: {
                practiceOwnerId: userId,
            },
        });

        return JSON.parse(
            JSON.stringify({
                practice: ProviderPractice.validate(practice),
            })
        );
    };
