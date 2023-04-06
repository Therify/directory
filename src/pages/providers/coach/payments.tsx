import { useEffect, useState } from 'react';
import { ProvidersService } from '@/lib/modules/providers/service';
import { GetTherifyUserPageProps } from '@/lib/modules/providers/service/page-props/get-therify-user-props';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { RBAC } from '@/lib/shared/utils/rbac';
import { trpc } from '@/lib/shared/utils/trpc';
import { URL_PATHS } from '@/lib/sitemap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
    Alert,
    Button,
    CenteredContainer,
    H3,
    PageContentContainer,
    Paragraph,
} from '@/lib/shared/components/ui';
import { Link, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    WarningRounded,
    ArrowForwardRounded,
    ExitToApp,
} from '@mui/icons-material';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function PaymentsPage({
    user,
}: GetTherifyUserPageProps.ProviderTherifyUserPageProps) {
    const theme = useTheme();
    const [error, setError] = useState<string>();
    const { isLoading: isCreatingAccount, mutate: createStripeConnectAccount } =
        trpc.useMutation(`accounts.billing.handle-stripe-connect-onboarding`, {
            onSuccess({ errors, onboardingUrl }) {
                if (onboardingUrl) {
                    console.log({ onboardingUrl });
                    if (typeof window !== 'undefined') {
                        window.location.href = onboardingUrl;
                    }
                    return;
                }
                const [error] = errors;
                console.error(error);
                setError(error);
            },
            onError(error) {
                console.error(error);
                setError(error.message);
            },
        });

    const {
        isLoading: isCreatingStripeConnectLogin,
        mutate: createStripeConnectLogin,
    } = trpc.useMutation(`accounts.billing.create-stripe-connect-login-url`, {
        onSuccess({ errors, url }) {
            if (url) {
                if (typeof window !== 'undefined') {
                    window.open(url);
                }
                return;
            }
            const [error] = errors;
            console.error(error);
            setError(error);
        },
        onError(error) {
            console.error(error);
            setError(error.message);
        },
    });
    const handleOnboarding = () => {
        const paymentsUrl = `${window.location.origin}${URL_PATHS.PROVIDERS.COACH.PAYMENTS}`;
        createStripeConnectAccount({
            userId: user.userId,
            refreshUrl: paymentsUrl,
            returnUrl: paymentsUrl,
        });
    };
    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.PAYMENTS}
            user={user}
        >
            <PageContentContainer fillContentSpace paddingX={6} paddingY={8}>
                <Box>
                    <H3>Payments and Payouts</H3>
                    <Paragraph>
                        We partner with{' '}
                        <Link
                            href="https://stripe.com/"
                            target="_blank"
                            style={{ color: theme.palette.text.primary }}
                        >
                            Stripe Connect
                        </Link>{' '}
                        for simplified payouts.
                    </Paragraph>

                    {user?.stripeConnectAccountId ? (
                        <Button
                            endIcon={<ExitToApp />}
                            isLoading={isCreatingStripeConnectLogin}
                            onClick={() =>
                                createStripeConnectLogin({
                                    userId: user.userId,
                                })
                            }
                        >
                            Launch Stripe Connect Dashboard
                        </Button>
                    ) : (
                        <Button
                            endIcon={<ArrowForwardRounded />}
                            isLoading={isCreatingAccount}
                            onClick={handleOnboarding}
                        >
                            Sign Up with Stripe Connect
                        </Button>
                    )}

                    {error && (
                        <Alert
                            icon={
                                <CenteredContainer>
                                    <WarningRounded />
                                </CenteredContainer>
                            }
                            title={error}
                            type="error"
                            sx={{ marginTop: 4 }}
                        />
                    )}
                </Box>
            </PageContentContainer>
        </ProviderNavigationPage>
    );
}
