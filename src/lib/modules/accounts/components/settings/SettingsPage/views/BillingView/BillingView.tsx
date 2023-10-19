import Box from '@mui/material/Box';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import { Paragraph, Caption, Button } from '@/lib/shared/components/ui';

interface BillingViewProps {
    launchStripePortal?: () => void;
}
export const BillingView = ({ launchStripePortal }: BillingViewProps) => {
    return (
        <Container>
            <Paragraph bold>Billing & Payments</Paragraph>
            <Caption secondary marginBottom={8}>
                We partner with Stripe for simplified billing. You can edit
                billing settings and pay invoices in Stripe’s customer portal.
            </Caption>
            <Button onClick={launchStripePortal} endIcon={<ArrowForward />}>
                Launch Stripe customer portal
            </Button>
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    maxWidth: 600,
    padding: theme.spacing(14, 0, 10),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(20, 0, 10),
    },
}));
