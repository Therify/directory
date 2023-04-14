import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { RBAC } from '@/lib/shared/utils';
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
    Caption,
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
export default function BillingPage({
    stripeCustomerPortalUrl,
    user,
    registrationLink,
    hasAvailableSeats,
}: MemberBillingPageProps) {
    const linkRef = React.useRef<HTMLParagraphElement>(null);
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
            <Box padding={4} maxWidth={800} margin="auto">
                <PageHeader
                    title="Account Management"
                    subtitle="Manage your account settings and billing information."
                />
                <H3 sx={{ marginTop: 8 }}>Billing and Payments</H3>
                <Paragraph>
                    We partner with{' '}
                    <Link
                        href="https://stripe.com/"
                        target="_blank"
                        style={{ color: theme.palette.text.primary }}
                    >
                        Stripe
                    </Link>{' '}
                    for simplified billing. You can edit billing settings in
                    Stripe&apos;s customer portal.
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
                        </Box>
                    </>
                )}
                {hasAvailableSeats && registrationLink && (
                    <>
                        <Divider />
                        <Box marginTop={8}>
                            <H5>Invite a Member to your Account</H5>
                            <Box>
                                <Caption>
                                    Share this link with your team.
                                </Caption>
                                <StyledRegistrationLink ref={linkRef}>
                                    {registrationLink}
                                </StyledRegistrationLink>
                                <Button
                                    type="outlined"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            registrationLink
                                        );
                                        setButtonText('Copied!');
                                    }}
                                >
                                    {buttonText}
                                </Button>
                            </Box>
                        </Box>
                    </>
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

const StyledRegistrationLink = styled(Paragraph)(({ theme }) => ({
    padding: theme.spacing(1),
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
}));
