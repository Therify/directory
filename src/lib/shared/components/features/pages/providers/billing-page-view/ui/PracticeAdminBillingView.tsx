import { format } from 'date-fns';
import { PlanStatus } from '@prisma/client';
import { Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ArrowForwardRounded as ArrowIcon,
    CheckCircle,
    CancelRounded,
    WarningRounded,
} from '@mui/icons-material';
import { TherifyUser } from '@/lib/shared/types';
import {
    Paragraph,
    H3,
    H4,
    Button,
    Alert,
    CenteredContainer,
    Badge,
    Divider,
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

                {user.plan && (
                    <>
                        <Divider />
                        <Box marginTop={8}>
                            <H4>Your Current Plan</H4>
                            <Box marginBottom={2}>
                                <Badge
                                    icon={
                                        isPlanActive ? (
                                            <CheckCircle />
                                        ) : (
                                            <CancelRounded />
                                        )
                                    }
                                    color={isPlanActive ? 'success' : 'error'}
                                >
                                    {getPlanStatusText(user.plan.status)}
                                </Badge>
                            </Box>
                            <Paragraph>
                                Period start:{' '}
                                {format(
                                    new Date(user.plan.startDate),
                                    'MMMM do, yyyy'
                                )}
                            </Paragraph>
                            <Paragraph>
                                Period end:{' '}
                                {format(
                                    new Date(user.plan.endDate),
                                    'MMMM do, yyyy'
                                )}
                            </Paragraph>
                            <Paragraph>
                                Renews: {user.plan.renews ? 'Yes' : 'No'}
                            </Paragraph>
                        </Box>
                    </>
                )}
            </Box>
        </PracticeAdminNavigationPage>
    );
};

const getPlanStatusText = (status: string) => {
    switch (status) {
        case PlanStatus.active:
            return 'Active';
        case PlanStatus.trialing:
            return 'Trialing';
        case PlanStatus.past_due:
            return 'Past Due';
        case PlanStatus.canceled:
            return 'Canceled';
        case PlanStatus.unpaid:
            return 'Unpaid';
        case PlanStatus.incomplete:
            return 'Incomplete';
        case PlanStatus.incomplete_expired:
            return 'Incomplete - Expired';
        default:
            return 'Unknown';
    }
};
