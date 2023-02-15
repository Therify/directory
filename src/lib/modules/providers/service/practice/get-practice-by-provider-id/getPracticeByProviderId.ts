import { GetPracticeByProviderId } from '@/lib/modules/providers/features/practice';
import { ProviderPractice } from '@/lib/shared/types';
import { ProvidersServiceParams } from '../../params';

export const factory =
    ({ prisma }: ProvidersServiceParams) =>
    async ({
        userId,
    }: GetPracticeByProviderId.Input): Promise<{
        practice: GetPracticeByProviderId.Output['practice'];
    }> => {
        const { practiceProvider } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                practiceProvider: {
                    select: {
                        practice: true,
                    },
                },
            },
        });
        if (!practiceProvider) {
            throw new Error('User is not a provider at a practice.');
        }

        return JSON.parse(
            JSON.stringify({
                practice: ProviderPractice.validate(practiceProvider.practice),
            })
        );
    };
