import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { RBAC } from '@/lib/shared/utils';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderBillingPageProps } from '@/lib/modules/providers/service/page-props/get-billing-page-props';
import { URL_PATHS } from '@/lib/sitemap';
import { ProviderBillingPageView } from '@/lib/shared/components/features/pages/providers/billing-page-view/BillingPageView';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getBillingPageProps,
    })
);
export default function BillingPage({
    stripeCustomerPortalUrl,
    user,
}: ProviderBillingPageProps) {
    return (
        <ProviderBillingPageView
            user={user}
            stripeCustomerPortalUrl={stripeCustomerPortalUrl}
            currentPath={URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION}
        />
    );
}
