import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { MembersServiceParams } from '../params';
import { URL_PATHS } from '@/lib/sitemap';
import { GetMemberTherifyUser } from '../get-member-therify-user';

export interface MemberTherifyUserPageProps {
    user: TherifyUser.TherifyUser;
}

export const factory = (params: MembersServiceParams) => {
    const getMemberTherifyUserPageProps: GetServerSideProps<
        MemberTherifyUserPageProps
    > = async (context) => {
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const getUser = GetMemberTherifyUser.factory(params);
        const { user } = await getUser({ userId: session.user.sub });

        if (user === null) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const props: MemberTherifyUserPageProps = {
            user,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getMemberTherifyUserPageProps;
};
