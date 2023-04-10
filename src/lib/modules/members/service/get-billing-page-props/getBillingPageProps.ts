import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '../get-member-therify-user';
import { MembersServiceParams } from '../params';

interface GetBillingPagePropsParams extends MembersServiceParams {}

export interface MemberBillingPageProps {
    user: TherifyUser.TherifyUser;
    stripeCustomerPortalUrl: string | null;
}

export const factory = (params: GetBillingPagePropsParams) => {
    const getMemberBillingPageProps: GetServerSideProps<
        MemberBillingPageProps
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
        const stripeCustomerPortalUrl =
            process.env.STRIPE_CUSTOMER_PORTAL_URL ?? null;
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                stripeCustomerPortalUrl,
            },
        };
    };
    return getMemberBillingPageProps;
};
