import { GetServerSideProps } from 'next';
import { ProviderProfile } from '@prisma/client';
import { TherifyUser } from '@/lib/types/therify-user';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '../../accounts/service';

interface GetDirectoryPageProps extends MembersServiceParams {
    accountService: typeof AccountsService;
}

export interface DirectoryPageProps {
    providerProfiles: ProviderProfile[];
    user: TherifyUser.TherifyUser;
}

export function factory({ prisma, accountService }: GetDirectoryPageProps) {
    const getDirectoryPageProps: GetServerSideProps<
        DirectoryPageProps
    > = async (context) => {
        const session = await getSession(context.req, context.res);
        if (!session)
            throw Error('Failed fetching Home Page Props, session not found');
        const [{ user }, providerProfiles] = await Promise.all([
            accountService.getUserDetailsById({
                userId: session.user.sub,
            }),
            prisma.providerProfile.findMany(),
        ]);
        return {
            props: {
                providerProfiles: JSON.parse(JSON.stringify(providerProfiles)),
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    };
    return getDirectoryPageProps;
}
