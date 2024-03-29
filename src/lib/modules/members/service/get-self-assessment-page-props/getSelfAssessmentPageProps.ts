import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '../get-member-therify-user';
import { MembersServiceParams } from '../params';

export interface SelfAssessmentPageProps {
    user: TherifyUser.TherifyUser;
}

export const factory = (params: MembersServiceParams) => {
    const getSelfAssessmentPageProps: GetServerSideProps<
        SelfAssessmentPageProps
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
        const [{ user }] = await Promise.all([
            getTherifyUser({
                userId: session.user.sub,
            }),
        ]);
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    };
    return getSelfAssessmentPageProps;
};
