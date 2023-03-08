import { Box, Link } from '@mui/material';
import { isAfter, format } from 'date-fns';
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
import { TherifyUser } from '@/lib/shared/types';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderBillingPageProps } from '@/lib/modules/providers/service/page-props/get-billing-page-props';
import {
    ProviderNavigationPage,
    PracticeAdminNavigationPage,
} from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';
import { PlanStatus } from '@prisma/client';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getBillingPageProps,
    })
);
export default function BillingPage({
    stripeCustomerPortalUrl,
    user,
}: ProviderBillingPageProps) {
    const isPlanExpired =
        !!user?.plan?.endDate &&
        isAfter(new Date(), new Date(user.plan.endDate));
    const isPlanActive =
        user &&
        (user?.plan?.status === PlanStatus.active ||
            user?.plan?.status === PlanStatus.trialing);
    return (
        <>
            {user?.isPracticeAdmin ? (
                <PracticeAdminBillingView
                    stripeCustomerPortalUrl={stripeCustomerPortalUrl}
                    isPlanExpired={isPlanExpired}
                    isPlanActive={isPlanActive}
                    user={user}
                />
            ) : (
                <ProviderBillingView
                    user={user}
                    isPlanExpired={isPlanExpired}
                    isPlanActive={isPlanActive}
                />
            )}
        </>
    );
}

const PracticeAdminBillingView = ({
    stripeCustomerPortalUrl,
    isPlanExpired,
    isPlanActive,
    user,
}: {
    isPlanExpired: boolean;
    isPlanActive: boolean;
    user: TherifyUser.TherifyUser;
    stripeCustomerPortalUrl: string | null;
}) => {
    const theme = useTheme();

    return (
        <PracticeAdminNavigationPage
            currentPath={URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION}
            user={user}
        >
            <Box padding={4}>
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

const ProviderBillingView = ({
    user,
    isPlanExpired,
    isPlanActive,
}: {
    user: TherifyUser.TherifyUser;
    isPlanExpired: boolean;
    isPlanActive: boolean;
}) => {
    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.ACCOUNT.BILLING_AND_SUBSCRIPTION}
            user={user}
        >
            <Box padding={4}>
                {(isPlanExpired || !isPlanActive) && user && (
                    <Box marginBottom={4}>
                        <PlanAlert
                            showExpiredMessage={isPlanExpired}
                            endDate={user.plan?.endDate}
                            message="Please reach out to your practice administrator to update your billing information."
                        />
                    </Box>
                )}
                <H3>Billing and Subscription</H3>
                <Paragraph>
                    Your billing is handled by your practice administrator.
                    Please contact them for any billing questions.
                </Paragraph>
            </Box>
        </ProviderNavigationPage>
    );
};

const PlanAlert = ({
    endDate,
    message,
    showExpiredMessage,
}: {
    endDate?: string;
    showExpiredMessage: boolean;
    message: string;
}) => {
    const expiredTitle = `Your plan expired${
        endDate ? ` on ${format(new Date(endDate), 'MMMM do, yyyy')}` : ''
    }.`;
    const title = showExpiredMessage
        ? expiredTitle
        : 'Your plan is not active.';
    return (
        <Alert
            icon={
                <CenteredContainer marginRight={2}>
                    <WarningRounded />
                </CenteredContainer>
            }
            title={title}
            type="error"
            message={message}
        />
    );
};
