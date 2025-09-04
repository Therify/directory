import { Box, Link, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
    Paragraph,
    H1,
    Caption,
    CenteredContainer,
    AbstractShape1,
    TherifyIcon,
} from '@/lib/shared/components/ui';
import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '@/lib/modules/accounts/service';
import { URL_PATHS } from '@/lib/sitemap';
import { useRemoveHubspotChatWidget } from '@/lib/modules/messaging/components/Chat/useRemoveHubspotChatWidget';
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context.req, context.res);
    if (!session) {
        return {
            props: {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            },
        };
    }
    const { user } = await AccountsService.getUserDetailsById({
        userId: session.user.sub,
    });

    if (!user) {
        return {
            props: {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            },
        };
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                user,
            })
        ),
    };
};
export default function DeprecationPage() {
    const theme = useTheme();
    useRemoveHubspotChatWidget();
    return (
        <CenteredContainer
            fillSpace
            style={{ background: theme.palette.background.default }}
        >
            <Stack spacing={8} sx={{ maxWidth: '800px', p: 2, width: '100%' }}>
                <Container>
                    <CenteredContainer zIndex={2} position="relative">
                        <Stack spacing={4} alignItems="center">
                            <TherifyIcon />
                            <Title>This Service is No Longer Available</Title>

                            <Paragraph>
                                Therify Directory is no longer in service. If
                                you need assistance or have any questions,
                                please reach out to us at{' '}
                                <Link href="mailto:help@therify.co">
                                    help@therify.co
                                </Link>
                                .
                            </Paragraph>
                        </Stack>
                    </CenteredContainer>
                    <Shape />
                </Container>
                <Caption secondary sx={{ textAlign: 'center' }}>
                    If your company still has access to Therify services, you
                    may access them at{' '}
                    <Link href="https://matching.therify.co?utm_source=directory-deprecated">
                        matching.therify.co
                    </Link>
                    . Refer to your benefit resources to create an account.
                </Caption>
            </Stack>
        </CenteredContainer>
    );
}
const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h2,
}));

const Container = styled(Box)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(10),
    maxWidth: '800px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));

const Shape = styled(AbstractShape1)(({ theme }) => ({
    position: 'absolute',
    width: '250px',
    top: -100,
    right: -100,
    transform: 'rotate(-90deg)',
    zIndex: 1,
}));
