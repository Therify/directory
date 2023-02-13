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

export default function BillingPage({
    customerPortalUrl,
}: {
    customerPortalUrl?: string;
}) {
    const theme = useTheme();
    return (
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
                for simplified billing. You can edit subscription and payment
                settings in Stripe&apos;s customer portal.
            </Paragraph>

            {customerPortalUrl ? (
                <Link
                    href={customerPortalUrl}
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
    );
}

export const getServerSideProps = () => {
    return {
        props: {
            ...withPageAuthRequired(),
            customerPortalUrl: process.env.STRIPE_CUSTOMER_PORTAL_URL,
        },
    };
};
