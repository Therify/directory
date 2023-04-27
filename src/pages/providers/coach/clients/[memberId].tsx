import { ProviderNavigationPage } from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderClientDetailsPageProps } from '@/lib/modules/providers/service/page-props/get-client-details-page-props';
import { ClientDetails } from '@/lib/modules/providers/components/Clients';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getClientDetailsPageProps,
    })
);

export default function ClientDetailsPage({
    user,
    memberDetails,
    invoices,
}: ProviderClientDetailsPageProps) {
    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.CLIENTS}
            user={user}
        >
            <ClientDetails
                provider={user}
                memberDetails={memberDetails}
                invoices={invoices}
            />
        </ProviderNavigationPage>
    );
}
