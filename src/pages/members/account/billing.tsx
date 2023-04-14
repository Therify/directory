import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { differenceInCalendarMonths } from 'date-fns';
import { RBAC, formatMembershipPlanChangeRequestUrl } from '@/lib/shared/utils';
import { Box, Link } from '@mui/material';
import { URL_PATHS } from '@/lib/sitemap';
import { useTheme } from '@mui/material/styles';
import {
    ArrowForwardRounded as ArrowIcon,
    CheckCircle,
    CancelRounded,
    WarningRounded,
} from '@mui/icons-material';
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
import { PlanStatus } from '@prisma/client';
import { format } from 'date-fns';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { membersService } from '@/lib/modules/members/service';
import { MemberBillingPageProps } from '@/lib/modules/members/service/get-billing-page-props/getBillingPageProps';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getBillingPageProps,
    })
);

const MEMRBERSHIP_PLAN_CHANGE_REQUEST_FORM_URL =
    'https://form.jotform.com/231035598721154' as const;
export default function BillingPage({
    stripeCustomerPortalUrl,
    user,
}: MemberBillingPageProps) {
    const isPlanActive =
        user &&
        (user?.plan?.status === PlanStatus.active ||
            user?.plan?.status === PlanStatus.trialing);
    const theme = useTheme();
    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.ACCOUNT.BILLING_AND_PAYMENTS}
            user={user}
        >
            <Box padding={4} maxWidth={800} margin="auto">
                <H3>Billing and Payments</H3>
                {!user?.isAccountAdmin && (
                    <>
                        <Paragraph>
                            We partner with{' '}
                            <Link
                                href="https://stripe.com/"
                                target="_blank"
                                style={{ color: theme.palette.text.primary }}
                            >
                                Stripe
                            </Link>{' '}
                            for simplified billing. You can edit billing
                            settings in Stripe&apos;s customer portal.
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
                    </>
                )}

                {user?.plan && (
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
                            {user.isAccountAdmin && (
                                <>
                                    <Paragraph>
                                        Seats: {user.plan.seats}
                                    </Paragraph>
                                    <Paragraph>
                                        Covered Sessions Per seat:{' '}
                                        {user.plan.coveredSessions}
                                    </Paragraph>
                                </>
                            )}
                        </Box>
                    </>
                )}
                {user?.isAccountAdmin && user.plan && (
                    <Box width="100%" marginTop={4}>
                        <Divider />
                        <H4>Request to change your plan</H4>
                        <Paragraph>
                            You may submit a request to update or cancel your
                            plan by launching and submitting a plan change
                            request. Plan changes are usually processed within
                            2-3 business days (excluding holidays).
                        </Paragraph>
                        <Button
                            endIcon={<ArrowIcon />}
                            onClick={() => {
                                if (typeof window !== 'undefined' && user.plan)
                                    window.open(
                                        formatMembershipPlanChangeRequestUrl(
                                            MEMRBERSHIP_PLAN_CHANGE_REQUEST_FORM_URL,
                                            {
                                                accountId: user.accountId!,
                                                userId: user.userId,
                                                email: user.emailAddress,
                                                planType:
                                                    user.plan.seats > 1
                                                        ? 'Team'
                                                        : 'Individual',
                                                billingCycle: getBillingCycle(
                                                    user.plan.startDate,
                                                    user.plan.endDate
                                                ),
                                                seatCount: user.plan.seats,
                                                coveredSessions:
                                                    user.plan.coveredSessions,
                                            }
                                        )
                                    );
                            }}
                        >
                            Launch Plan Change Form
                        </Button>
                    </Box>
                )}
            </Box>
        </MemberNavigationPage>
    );
}
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

const getBillingCycle = (
    startDate: string,
    endDate: string
): 'Month' | 'Biannual' | 'Annual' => {
    const months = differenceInCalendarMonths(
        new Date(endDate),
        new Date(startDate)
    );
    console.log('months', months);
    switch (months) {
        case 1:
            return 'Month';
        case 6:
            return 'Biannual';
        case 12:
            return 'Annual';
        default:
            // This will render as empty on the form
            return '' as 'Month';
    }
};
