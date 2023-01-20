import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { H1, CenteredContainer } from '@/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = withPageAuthRequired();

export default function BillingSuccessPage() {
    return (
        <PageContainer>
            <CenteredContainer fillSpace>
                <H1>TODO: Billing Success Page</H1>
                <ul>
                    <li>Poll for new plans (await the webhook)</li>
                    <li>Redirect to the practice dashboard</li>
                    <li>Or Timeout and handle webhook stalling/failures</li>
                </ul>
            </CenteredContainer>
        </PageContainer>
    );
}

const PageContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    overflowY: 'auto',
    height: '100%',
    width: '100%',
}));
