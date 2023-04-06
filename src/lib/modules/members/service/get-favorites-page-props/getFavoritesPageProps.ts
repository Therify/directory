import { DirectoryProfile } from '@/lib/shared/types/presentation';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '../get-member-therify-user';
import { MembersServiceParams } from '../params';
import { isAtRisk } from '@/lib/shared/types/self-assessment/is-at-risk/isAtRisk';

export interface FavoritesPageProps {
    favoriteProfiles: DirectoryProfile.DirectoryProfileCard[];
    user: TherifyUser.TherifyUser;
}

export const factory = (params: MembersServiceParams) => {
    const getFavoritesPageProps: GetServerSideProps<
        FavoritesPageProps
    > = async (context) => {
        const isMemberAtRisk = await isAtRisk(context);
        if (isMemberAtRisk) {
            return {
                redirect: {
                    destination: '/members/request-appointment',
                    permanent: false,
                },
            };
        }
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            };
        }
        const getTherifyUser = GetMemberTherifyUser.factory(params);
        const [{ user }, favoriteProfiles] = await Promise.all([
            getTherifyUser({
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
                        favoriteProfiles.map((f) =>
                            DirectoryProfile.validate(f.providerProfile)
                        )
                    )
                ),
            },
        };
    };
    return getFavoritesPageProps;
};
