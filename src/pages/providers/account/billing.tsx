import { Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ArrowForwardRounded as ArrowIcon,
    WarningRounded,
} from '@mui/icons-material';
import {
    Paragraph,
    H3,
    Button,
    Alert,
    CenteredContainer,
} from '@/lib/shared/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { RBAC } from '@/lib/shared/utils';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderBillingPageProps } from '@/lib/modules/providers/service/page-props/get-billing-page-props';
import { PracticeAdminNavigationPage } from '@/lib/shared/components/features/pages/PracticeAdminNavigationPage';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getBillingPageProps,
    })
);
export default function BillingPage({
    stripeCustomerPortalUrl,
    user,
}: ProviderBillingPageProps) {
    const theme = useTheme();
    return (
        <PracticeAdminNavigationPage
            currentPath="/providers/account/billing"
            user={user}
        >
            <Box padding={4}>
                <H3>Billing and Subscription</H3>
                <Paragraph>
                    We partner with{' '}
                    <Link
                        href="https://stripe.com/"
                        target="_blank"
                        style={{ color: theme.palette.text.primary }}
                    >
                        Stripe
                    </Link>{' '}
                    for simplified billing. You can edit subscription and
                    payment settings in Stripe&apos;s customer portal.
                </Paragraph>

                {stripeCustomerPortalUrl ? (
                    <Link
                        href={stripeCustomerPortalUrl}
                        target="_blank"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button endIcon={<ArrowIcon />}>
                            Launch Stripe Customer Portal
                        </Button>
                    </Link>
                ) : (
                    <Alert
                        icon={
                            <CenteredContainer>
                                <WarningRounded />
                            </CenteredContainer>
                        }
                        title="Stripe Billing Issue"
                        type="error"
                        message="Stripe customer portal URL is not configured. Please reach
                    out to Therify support."
                    />
                )}
            </Box>
        </PracticeAdminNavigationPage>
    );
}
