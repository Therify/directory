import React from 'react';
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
    Groups,
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
    H5,
} from '@/lib/shared/components/ui';
import { PlanStatus } from '@prisma/client';
import { format } from 'date-fns';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { membersService } from '@/lib/modules/members/service';
import { MemberBillingPageProps } from '@/lib/modules/members/service/get-billing-page-props/getBillingPageProps';
import { styled } from '@mui/material/styles';
import { PageHeader } from '@/lib/shared/components/ui/PageHeader/PageHeader';

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
    accountDetails,
}: MemberBillingPageProps) {
    const linkRef = React.useRef<HTMLAnchorElement>(null);
    const [buttonText, setButtonText] = React.useState('Copy to clipboard');
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
            <PageContainer>
                <Box padding={4} maxWidth={800} margin="auto">
                    <PageHeader
                        title="Billing and Payments"
                        subtitle="Manage your billing information."
                    />

                    {accountDetails?.registrationLink &&
                        accountDetails.totalSeats > 1 && (
                            <>
                                <Divider />
                                <H5>Invitations</H5>
                                <Box marginTop={8}>
                                    <Box>
                                        {accountDetails.hasAvailableSeats ? (
                                            <>
                                                <Paragraph>
                                                    Invite your team members to
                                                    join your account by sharing
                                                    this link:
                                                </Paragraph>
                                                <StyledRegistrationLink
                                                    ref={linkRef}
                                                    href={
                                                        accountDetails.registrationLink
                                                    }
                                                    target="_blank"
                                                >
                                                    {
                                                        accountDetails.registrationLink
                                                    }
                                                </StyledRegistrationLink>
                                                <Button
                                                    type="outlined"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(
                                                            accountDetails.registrationLink!
                                                        );
                                                        setButtonText(
                                                            'Copied!'
                                                        );
                                                    }}
                                                >
                                                    {buttonText}
                                                </Button>
                                            </>
                                        ) : (
                                            <Alert
                                                type="info"
                                                icon={
                                                    <CenteredContainer>
                                                        <Groups />
                                                    </CenteredContainer>
                                                }
                                                title="your team is full"
                                                message="Increase your seat count to invite more members."
                                            />
                                        )}
                                    </Box>
                                </Box>
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
                                        color={
                                            isPlanActive ? 'success' : 'error'
                                        }
                                    >
                                        {getPlanStatusText(user.plan.status)}
                                    </Badge>
                                </Box>
                                {user.plan.status !== PlanStatus.canceled && (
                                    <>
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
                                        {accountDetails && (
                                            <>
                                                {accountDetails.totalSeats >
                                                    1 && (
                                                    <Paragraph>
                                                        Usage:{' '}
                                                        {`${
                                                            accountDetails.claimedSeats
                                                        } ${
                                                            accountDetails.claimedSeats ===
                                                            1
                                                                ? 'seat'
                                                                : 'seats'
                                                        } claimed of ${
                                                            accountDetails.totalSeats
                                                        } total ${
                                                            accountDetails.totalSeats ===
                                                            1
                                                                ? 'seat'
                                                                : 'seats'
                                                        }`}
                                                    </Paragraph>
                                                )}

                                                <Paragraph>
                                                    Covered Sessions{' '}
                                                    {accountDetails.totalSeats >
                                                        1 && 'per seat '}
                                                    {getBillingCycleDisplayText(
                                                        user.plan.startDate,
                                                        user.plan.endDate
                                                    )}
                                                    :{' '}
                                                    {
                                                        accountDetails.coveredSessions
                                                    }
                                                </Paragraph>
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>
                        </>
                    )}

                    <Divider />
                    <H3>
                        {user?.isAccountAdmin
                            ? 'Invoices, Billing Methods, and Plan Cancelation'
                            : 'Billing & Payments'}
                    </H3>
                    <Paragraph>
                        We partner with{' '}
                        <Link
                            href="https://stripe.com/"
                            target="_blank"
                            style={{
                                color: theme.palette.text.primary,
                            }}
                        >
                            Stripe
                        </Link>{' '}
                        for simplified billing.{' '}
                        {user?.isAccountAdmin
                            ? "You can edit billing settings, cancel/renew your subscription, and pay invoices in Stripe's customer portal."
                            : "You can edit billing settings and pay invoices in Stripe's customer portal."}
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

                    {user?.isAccountAdmin && user.plan && (
                        <Box width="100%" marginTop={4}>
                            <Divider />
                            <H4>Request to change your plan</H4>
                            <Paragraph>
                                Need more seats or sessions? You may submit a
                                request to update your plan by submitting a plan
                                change request. Plan changes are usually
                                processed within 2-3 business days (excluding
                                holidays).
                            </Paragraph>
                            <Button
                                endIcon={<ArrowIcon />}
                                onClick={() => {
                                    if (
                                        typeof window !== 'undefined' &&
                                        user.plan
                                    )
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
                                                    billingCycle:
                                                        getBillingCycle(
                                                            user.plan.startDate,
                                                            user.plan.endDate
                                                        ),
                                                    seatCount: user.plan.seats,
                                                    coveredSessions:
                                                        user.plan
                                                            .coveredSessions,
                                                }
                                            )
                                        );
                                }}
                            >
                                Request a Plan Change
                            </Button>
                        </Box>
                    )}
                </Box>
            </PageContainer>
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
const getBillingCycleDisplayText = (startDate: string, endDate: string) => {
    const months = differenceInCalendarMonths(
        new Date(endDate),
        new Date(startDate)
    );

    switch (months) {
        case 1:
            return 'per month';
        case 6:
            return 'every 6 months';
        case 12:
            return 'per year';
        default:
            return '';
    }
};

const StyledRegistrationLink = styled(Link)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    display: 'block',
}));

const PageContainer = styled(Box)(({ theme }) => ({
    wisth: '100%',
    height: '100%',
    overflow: 'auto',
    margin: '0 auto',
    padding: theme.spacing(8, 0),
}));
