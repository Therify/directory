import { GetServerSideProps } from 'next';
import { SelfAssessment } from '@prisma/client';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { GetMemberTherifyUser } from '../get-member-therify-user';

export interface MemberHomePageProps {
    selfAssessments: SelfAssessment[];
    user: TherifyUser.TherifyUser;
}

export function factory(params: MembersServiceParams) {
    const getHomePageProps: GetServerSideProps<MemberHomePageProps> = async (
        context
    ) => {
        const session = await getSession(context.req, context.res);
        if (!session)
            throw Error('Failed fetching Home Page Props, session not found');
        const getTherifyUser = GetMemberTherifyUser.factory(params);
        const [{ user }, selfAssessments] = await Promise.all([
            getTherifyUser({
                userId: session.user.sub,
            }),
            params.prisma.selfAssessment.findMany({
                where: {
                    userId: session.user.sub,
                },
            }),
        ]);
        return {
            props: { selfAssessments, user: JSON.parse(JSON.stringify(user)) },
        };
    };
    return getHomePageProps;
}
