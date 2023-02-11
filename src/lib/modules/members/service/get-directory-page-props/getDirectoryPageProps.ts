import { GetServerSideProps } from 'next';
import { ProviderProfile } from '@prisma/client';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '../../../accounts/service/service';

interface GetDirectoryPageProps extends MembersServiceParams {
    accountService: typeof AccountsService;
}

export interface DirectoryPageProps {
    providerProfiles: ProviderProfile[];
    user: TherifyUser.TherifyUser;
    favoriteProfiles: ProviderProfile[];
}

export function factory({ prisma, accountService }: GetDirectoryPageProps) {
    const getDirectoryPageProps: GetServerSideProps<
        DirectoryPageProps
    > = async (context) => {
        const session = await getSession(context.req, context.res);
        if (!session)
            throw Error('Failed fetching Home Page Props, session not found');
        const [{ user }, providerProfiles, memberFavorites] = await Promise.all(
            [
                accountService.getUserDetailsById({
                    userId: session.user.sub,
                }),
                prisma.providerProfile.findMany(),
                prisma.memberFavorites.findMany({
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
            props: {
                providerProfiles: JSON.parse(JSON.stringify(providerProfiles)),
                user: JSON.parse(JSON.stringify(user)),
                favoriteProfiles: JSON.parse(
                    JSON.stringify(
                        memberFavorites.map(
                            (favorite) => favorite.providerProfile
                        )
                    )
                ),
            },
        };
    };
    return getDirectoryPageProps;
}