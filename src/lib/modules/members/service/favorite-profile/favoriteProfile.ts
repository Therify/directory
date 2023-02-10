import { FavoriteProfile } from '@/lib/modules/members/features';
import { MembersServiceParams } from '../params';

export const factory = ({ prisma }: MembersServiceParams) => {
    return async function favoriteProfile(
        input: FavoriteProfile.Input
    ): Promise<FavoriteProfile.Output> {
        const { memberId, profileId, isFavorite: isCurrentlyFavorited } = input;
        try {
            if (isCurrentlyFavorited) {
                await prisma.memberFavorites.delete({
                    where: {
                        memberId_profileId: {
                            memberId,
                            profileId,
                        },
                    },
                });
                return {
                    success: true,
                    isFavorite: false,
                };
            }
            await prisma.memberFavorites.create({
                data: {
                    memberId,
                    profileId,
                },
            });
            return {
                success: true,
                isFavorite: true,
            };
        } catch (error) {
            return {
                success: false,
                isFavorite: isCurrentlyFavorited,
                error: 'Error favoriting profile',
            };
        }
    };
};
