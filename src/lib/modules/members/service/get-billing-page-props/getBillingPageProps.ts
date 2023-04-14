import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { GetMemberTherifyUser } from '../get-member-therify-user';
import { MembersServiceParams } from '../params';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';

interface GetBillingPagePropsParams extends MembersServiceParams {}

export interface MemberBillingPageProps {
    user: TherifyUser.TherifyUser;
    stripeCustomerPortalUrl: string | null;
    registrationLink: string | null;
    hasAvailableSeats: boolean;
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
        const isAccountOwner = user?.plan?.seats ?? 0 > 1;
        let registrationCodeLink: string | null = null;
        let hasAvailableSeats = false;
        if (isAccountOwner) {
            const account = await params.prisma.account.findFirst({
                select: {
                    id: true,
                    plans: {
                        take: 1,
                        where: {
                            status: 'active',
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                    registrationCode: {
                        take: 1,
                    },
                },
                where: {
                    accountOwnerId: session.user.sub,
                },
            });
            const seatsOccupied = await params.prisma.user.count({
                where: {
                    accountId: account?.id,
                },
            });
            hasAvailableSeats = seatsOccupied < (account?.plans[0]?.seats ?? 0);
            if (account?.registrationCode) {
                const registrationCode = account.registrationCode[0];
                registrationCodeLink = `${
                    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
                }${URL_PATHS.MEMBERS.REGISTER}?registrationCode=${
                    registrationCode.id
                }`;
            }
        }
        const stripeCustomerPortalUrl =
            process.env.STRIPE_CUSTOMER_PORTAL_URL ?? null;
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                stripeCustomerPortalUrl,
                registrationLink: registrationCodeLink ?? null,
                hasAvailableSeats,
            },
        };
    };
    return getMemberBillingPageProps;
};
