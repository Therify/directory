import { Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ArrowForwardRounded as ArrowIcon,
    WarningRounded,
} from '@mui/icons-material';
import { TherifyUser } from '@/lib/shared/types';
import {
    Paragraph,
    H3,
    Button,
    Alert,
    CenteredContainer,
} from '@/lib/shared/components/ui';
import { PracticeAdminNavigationPage } from '@/lib/shared/components/features/pages';
import { PlanAlert } from './PlanAlert';
import { TEST_IDS } from './testIds';

export const PracticeAdminBillingView = ({
    stripeCustomerPortalUrl,
    isPlanExpired,
    isPlanActive,
    currentPath,
    user,
}: {
    isPlanExpired: boolean;
    isPlanActive: boolean;
    user: TherifyUser.TherifyUser;
    stripeCustomerPortalUrl: string | null;
    currentPath: string;
}) => {
    const theme = useTheme();

    return (
        <PracticeAdminNavigationPage currentPath={currentPath} user={user}>
            <Box data-testid={TEST_IDS.PRACTICE_ADMIN_BILLING_VIEW} padding={4}>
                {(isPlanExpired || !isPlanActive) && user && (
                    <Box marginBottom={4}>
                        <PlanAlert
                            showExpiredMessage={isPlanExpired}
                            endDate={user.plan?.endDate}
                            message="Please update your billing information with Stripe to continue using Therify."
                        />
                    </Box>
                )}
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
};
