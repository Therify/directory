import { GetServerSideProps } from 'next';
import { SelfAssessment } from '@prisma/client';
import { TherifyUser } from '@/lib/types/therify-user';
import { MembersServiceParams } from '../params';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '../../accounts/service';

interface GetHomePageFactoryParams extends MembersServiceParams {
    accountService: typeof AccountsService;
}

export interface MemberHomePageProps {
    selfAssessments: SelfAssessment[];
    user: TherifyUser.TherifyUser;
}

export function factory({ prisma, accountService }: GetHomePageFactoryParams) {
    const getHomePageProps: GetServerSideProps<MemberHomePageProps> = async (
        context
    ) => {
        const session = await getSession(context.req, context.res);
        if (!session)
            throw Error('Failed fetching Home Page Props, session not found');
        const [{ user }, selfAssessments] = await Promise.all([
            accountService.getUserDetailsById({
                userId: session.user.sub,
            }),
            prisma.selfAssessment.findMany({
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
