import { useEffect } from 'react';
import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { ProvidersService } from '@/lib/modules/providers/service';
import { GetTherifyUserPageProps } from '@/lib/modules/providers/service/page-props/get-therify-user-props';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { RBAC } from '@/lib/shared/utils/rbac';
import { trpc } from '@/lib/shared/utils/trpc';
import { URL_PATHS } from '@/lib/sitemap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function PaymentsPage({
    user,
}: GetTherifyUserPageProps.ProviderTherifyUserPageProps) {
    const { isLoading: isCreatingAccount, mutate: createStripeConnectAccount } =
        trpc.useMutation(
            `accounts.${HandleStripeConnectOnboarding.TRPC_ROUTE}`,
            {
                onSuccess({ errors, onboardingUrl }) {
                    if (onboardingUrl) {
                        console.log({ onboardingUrl });
                        if (typeof window !== 'undefined') {
                            window.location.href = onboardingUrl;
                        }
                    }
                    const [error] = errors;
                    console.error(error);
                    // handleError(error ?? 'Could not create user.');
                },
                onError(error) {
                    console.error(error);
                    // setRegistrationError(error.message);
                },
            }
        );
    useEffect(() => {
        if (user && !user.stripeConnectAccountId) {
            const paymentsUrl = `${window.location.origin}${URL_PATHS.PROVIDERS.COACH.PAYMENTS}`;
            createStripeConnectAccount({
                userId: user.userId,
                refreshUrl: paymentsUrl,
                returnUrl: paymentsUrl,
            });
        }
    }, [createStripeConnectAccount, user]);
    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.PAYMENTS}
            user={user}
        >
            <div>
                <h4>Stripe account Id: {user?.stripeConnectAccountId}</h4>
                <div>{user && JSON.stringify(user)}</div>
            </div>
        </ProviderNavigationPage>
    );
}
