import { ProvidersServiceParams } from '../../params';
import { ListPracticeProfilesByUserId } from '@/lib/modules/providers/features/profiles';
import { ProviderProfile } from '@/lib/shared/types';

export function factory({ prisma }: ProvidersServiceParams) {
    return async function ({
        userId,
    }: ListPracticeProfilesByUserId.Input): Promise<{
        profiles: ListPracticeProfilesByUserId.Output['profiles'];
    }> {
        const practice = await prisma.practice.findUnique({
            where: {
                userId,
            },
            select: {
                id: true,
            },
        });
        if (!practice) throw new Error('User is not a practice admin');

        const results = await prisma.practiceProfile.findMany({
            where: {
                practiceId: practice.id,
            },
            select: {
                profile: true,
            },
        });

        const profiles = results.map((result) => result.profile);

        return {
            profiles: JSON.parse(
                JSON.stringify(profiles.map(ProviderProfile.validate))
            ),
        };
    };
}
