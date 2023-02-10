import { Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowForwardRounded as ArrowIcon } from '@mui/icons-material';
import { Paragraph, H3, Button } from '@/lib/shared/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = withPageAuthRequired();

export default function BillingPage() {
    const theme = useTheme();
    return (
        <Box>
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
            <Link
                href={process.env.STRIPE_CUSTOMER_PORTAL_URL}
                target="_blank"
                style={{ textDecoration: 'none' }}
            >
                <Button endIcon={<ArrowIcon />}>
                    Launch Stripe Customer Portal
                </Button>
            </Link>
        </Box>
    );
}
