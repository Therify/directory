import { FavoriteProfile } from '@/lib/features/members';
import { MembersServiceParams } from '../params';

export const factory = ({ prisma }: MembersServiceParams) => {
    return async function favoriteProfile(
        input: FavoriteProfile.Input
    ): Promise<FavoriteProfile.Output> {
        const { memberId, profileId } = input;
        try {
            await prisma.memberFavorites.create({
                data: {
                    memberId,
                    profileId,
                },
            });
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Error favoriting profile',
            };
        }
    };
};
