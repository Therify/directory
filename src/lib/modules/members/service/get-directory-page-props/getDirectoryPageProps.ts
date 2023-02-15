import { GetServerSideProps } from 'next';
import { ProviderProfile } from '@prisma/client';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { DirectoryProfile } from '@/lib/shared/types/presentation';
import { GetMemberTherifyUser } from '../get-member-therify-user';

export interface DirectoryPageProps {
    providerProfiles: DirectoryProfile.DirectoryProfileCard[];
    user: TherifyUser.TherifyUser;
    favoriteProfiles: ProviderProfile[];
}

export function factory(params: MembersServiceParams) {
    const getDirectoryPageProps: GetServerSideProps<
        DirectoryPageProps
    > = async (context) => {
        const session = await getSession(context.req, context.res);
        if (!session)
            throw Error('Failed fetching Home Page Props, session not found');
        const getTherifyUser = GetMemberTherifyUser.factory(params);
        const [{ user }, providerProfiles, memberFavorites] = await Promise.all(
            [
                getTherifyUser({
                    userId: session.user.sub,
                }),
                params.prisma.providerProfile.findMany(),
                params.prisma.memberFavorites.findMany({
                    where: {
                        memberId: session.user.sub,
                    },
                    include: {
                        providerProfile: true,
                    },
                }),
            ]
        );
        return {
            props: JSON.parse(
                JSON.stringify({
                    providerProfiles: providerProfiles.map(
                        DirectoryProfile.validate
                    ),

                    user,
                    favoriteProfiles: memberFavorites.map(
                        (favorite) => favorite.providerProfile
                    ),
                })
            ),
        };
    };
    return getDirectoryPageProps;
}
