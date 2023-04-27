import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { ProvidersServiceParams } from '../../params';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';
import { URL_PATHS } from '@/lib/sitemap';
import { GetProviderSessionInvoicesByMemberId } from '@/lib/modules/accounts/features/billing';
import { AccountsService } from '@/lib/modules/accounts/service';
import { prisma } from '@/lib/prisma';

export interface ProviderClientDetailsPageProps {
    user: TherifyUser.TherifyUser;
    memberDetails: {
        id: string;
        givenName: string;
        surname: string;
        emailAddress: string;
        // coveredSessions: number;
        // remainingSesssions: number;
    };
    invoices: GetProviderSessionInvoicesByMemberId.Output['invoices'];
}

export const factory = (params: ProvidersServiceParams) => {
    const getClientDetailsPageProps: GetServerSideProps<
        ProviderClientDetailsPageProps
    > = async (context) => {
        const { memberId } = context.query;
        if (typeof memberId !== 'string') {
            return {
                notFound: true,
            };
        }
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }
        const getUser = GetProviderTherifyUser.factory(params);
        const [{ user }, connectionRequest, { invoices }] = await Promise.all([
            getUser({ userId: session.user.sub }),
            // TODO: move to service method so we can get covered and remaining sessions
            prisma.connectionRequest.findFirst({
                where: {
                    memberId,
                    providerProfile: { userId: session.user.sub },
                },
                select: {
                    member: {
                        select: {
                            id: true,
                            givenName: true,
                            surname: true,
                            emailAddress: true,
                        },
                    },
                },
            }),
            AccountsService.billing.getProviderSessionInvoicesByMemberId({
                memberId,
                providerId: session.user.sub,
            }),
        ]);
        if (user === null) {
            return {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            };
        }

        if (connectionRequest === null) {
            return {
                notFound: true,
            };
        }

        const props: ProviderClientDetailsPageProps = {
            user,
            memberDetails: connectionRequest.member,
            invoices,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getClientDetailsPageProps;
};
