import { GetServerSideProps } from 'next';
import { ProviderProfile, TherifyUser } from '@/lib/types';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '../../accounts/service';

interface GetDirectoryProfileProps extends MembersServiceParams {
    accountService: typeof AccountsService;
}

export interface DirectoryProfilePageProps {
    providerProfile: ProviderProfile.ProviderProfile;
    user: TherifyUser.TherifyUser;
}

export function factory({ prisma, accountService }: GetDirectoryProfileProps) {
    const getDirectoryProfilePageProps: GetServerSideProps<
        DirectoryProfilePageProps
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
        const [{ user }, providerProfile] = await Promise.all([
            accountService.getUserDetailsById({
                userId: session.user.sub,
            }),
            prisma.providerProfile.findUnique({
                where: {
                    id: context.query.profileId as string,
                },
            }),
        ]);
        if (!providerProfile) {
            return {
                redirect: {
                    destination: '/404',
                    permanent: false,
                },
            };
        }
        return {
            props: {
                providerProfile: JSON.parse(
                    JSON.stringify(ProviderProfile.validate(providerProfile))
                ),
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    };
    return getDirectoryProfilePageProps;
}
