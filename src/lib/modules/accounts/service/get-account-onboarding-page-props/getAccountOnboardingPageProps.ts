import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '@/lib/modules/members/service/get-member-therify-user';
import { prisma } from '@/lib/prisma';
import { firebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';

interface GetOnboardingPagePropsParams {}

export interface AccountOnboardingPageProps {
    user: TherifyUser.TherifyUser;
}

export const factory = (params: GetOnboardingPagePropsParams) => {
    const getAccountOnboardingProps: GetServerSideProps<
        AccountOnboardingPageProps
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
            firebaseAdmin: firebaseAdminVendor,
        });
        const { user } = await getTherifyUser({
            userId: session.user.sub,
        });

        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    };
    return getAccountOnboardingProps;
};
