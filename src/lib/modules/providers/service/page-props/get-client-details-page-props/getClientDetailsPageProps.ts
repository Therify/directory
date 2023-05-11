import { TherifyUser } from '@/lib/shared/types/therify-user';
import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { ProvidersServiceParams } from '../../params';
import { GetProviderTherifyUser } from '../../get-provider-therify-user';
import { URL_PATHS } from '@/lib/sitemap';
import { GetProviderSessionInvoicesByMemberId } from '@/lib/modules/accounts/features/billing';
import { AccountsService } from '@/lib/modules/accounts/service';
import { ConnectionRequest } from '@/lib/shared/types';
import { directoryService } from '@/lib/modules/directory/service';

export interface ProviderClientDetailsPageProps {
    user: TherifyUser.TherifyUser;
    connectionRequest: ConnectionRequest.Type;
    invoices: GetProviderSessionInvoicesByMemberId.Output['invoices'];
}

export const factory = (params: ProvidersServiceParams) => {
    const getClientDetailsPageProps: GetServerSideProps<
        ProviderClientDetailsPageProps
    > = async (context) => {
        const { memberId: memberIdentifier } = context.query;
        if (typeof memberIdentifier !== 'string') {
            return {
                notFound: true,
            };
        }
        const memberId = `auth0|${memberIdentifier}`;
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
            directoryService.getConnectionRequest({
                memberId,
                providerId: session.user.sub,
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

        if (
            connectionRequest === null ||
            connectionRequest.member.account === null ||
            connectionRequest.member.memberProfile === null
        ) {
            return {
                notFound: true,
            };
        }

        const props: ProviderClientDetailsPageProps = {
            user,
            connectionRequest,
            invoices,
        };
        return JSON.parse(JSON.stringify({ props }));
    };
    return getClientDetailsPageProps;
};
