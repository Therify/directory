import { GetServerSideProps } from 'next';
import { ProviderProfile } from '@prisma/client';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { DirectoryProfile } from '@/lib/shared/types/presentation';
import { directoryService } from '@/lib/modules/directory/service';
import { State } from '@/lib/shared/types';
import { URL_PATHS } from '@/lib/sitemap';
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
        const memberProfile = await params.prisma.memberProfile.findUnique({
            where: {
                userId: session.user.sub,
            },
            select: {
                state: true,
            },
        });
        if (!memberProfile) {
            return {
                redirect: {
                    // TODO: redirect to the member profile editor
                    destination: '/member/profile',
                    permanent: false,
                },
            };
        }
        const [{ user }, { profiles: providerProfiles }, memberFavorites] =
            await Promise.all([
                getTherifyUser({
                    userId: session.user.sub,
                }),
                directoryService.executeProviderSearch({
                    state: memberProfile.state as State.State,
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
        if (user === null) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const props: DirectoryPageProps = {
            providerProfiles,
            user,
            favoriteProfiles: memberFavorites.map(
                (favorite) => favorite.providerProfile
            ),
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getDirectoryPageProps;
}
