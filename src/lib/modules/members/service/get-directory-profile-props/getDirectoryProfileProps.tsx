import { GetServerSideProps } from 'next';
import { ProviderProfile, TherifyUser } from '@/lib/shared/types';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { GetMemberTherifyUser } from '../get-member-therify-user';

export interface DirectoryProfilePageProps {
    providerProfile: ProviderProfile.ProviderProfile;
    user: TherifyUser.TherifyUser;
    providerHasBeenSelected?: boolean;
}

export function factory({ prisma, ...params }: MembersServiceParams) {
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
        const getTherifyUser = GetMemberTherifyUser.factory({
            prisma,
            ...params,
        });
        const [{ user }, providerProfile, connectionRequest] =
            await Promise.all([
                getTherifyUser({
                    userId: session.user.sub,
                }),
                prisma.providerProfile.findUnique({
                    where: {
                        id: context.query.profileId as string,
                    },
                }),
                prisma.connectionRequest.findFirst({
                    where: {
                        memberId: session.user.sub,
                        profileId: context.query.profileId as string,
                    },
                    select: {
                        profileId: true,
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
                providerHasBeenSelected: !!connectionRequest,
            },
        };
    };
    return getDirectoryProfilePageProps;
}
