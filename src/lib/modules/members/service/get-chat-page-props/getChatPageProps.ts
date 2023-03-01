import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '../get-member-therify-user';
import { MembersServiceParams } from '../params';

interface GetChatPagePropsParams extends MembersServiceParams {}

export interface MemberChatPageProps {
    user: TherifyUser.TherifyUser;
}

export const factory = (params: GetChatPagePropsParams) => {
    const getMemberChatPageProps: GetServerSideProps<
        MemberChatPageProps
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
        const getTherifyUser = GetMemberTherifyUser.factory(params);
        const { user } = await getTherifyUser({
            userId: session.user.sub,
        });
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    };
    return getMemberChatPageProps;
};
