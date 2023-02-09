import { TherifyUser } from '@/lib/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { ProviderProfile } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { AccountsService } from '../../accounts';
import { MembersServiceParams } from '../params';

export interface FavoritesPageProps {
    favoriteProfiles: ProviderProfile[];
    user: TherifyUser.TherifyUser;
}

interface GetFavoritesPagePropsParams extends MembersServiceParams {
    accountsService: AccountsService;
}

export const factory = (params: GetFavoritesPagePropsParams) => {
    const getFavoritesPageProps: GetServerSideProps<
        FavoritesPageProps
    > = async (context) => {
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            };
        }
        const [{ user }, favoriteProfiles] = await Promise.all([
            params.accountsService.getUserDetailsById({
                userId: session.user.sub,
            }),
            params.prisma.memberFavorites.findMany({
                where: {
                    memberId: session.user.sub,
                },
                include: {
                    providerProfile: true,
                },
            }),
        ]);
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                favoriteProfiles: JSON.parse(
                    JSON.stringify(
                        favoriteProfiles.map((f) => f.providerProfile)
                    )
                ),
            },
        };
    };
    return getFavoritesPageProps;
};
