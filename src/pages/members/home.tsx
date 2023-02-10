import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button, H4, Paragraph } from '@/components/ui';
import { RBAC } from '@/lib/utils';
import { membersService } from '@/lib/services/members';
import { MemberHomePageProps } from '@/lib/services/members/get-home-page-props/getHomePageProps';
import { MemberNavigationPage } from '@/components/features/pages/MemberNavigationPage';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { PageHeader } from '@/components/ui/PageHeader';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getHomePageProps,
    })
);

export default function MemberHomePage({ user }: MemberHomePageProps) {
    const router = useRouter();
    return (
        <MemberNavigationPage currentPath={URL_PATHS.MEMBERS.HOME} user={user}>
            <Container>
                <PageHeader
                    type="primary"
                    title={`We're glad you're here, ${
                        user?.givenName ?? 'Member'
                    }`}
                />
                <RequestSelfAssessment sx={{ mt: 20 }}>
                    <H4>Let&apos;s get started</H4>
                    <Paragraph>
                        To receive recommendations, complete our brief
                        self-assessment.
                    </Paragraph>
                    <section>
                        <Button
                            fullWidth={false}
                            onClick={() =>
                                router.push('/members/self-assessment')
                            }
                        >
                            Start Self-Assessment
                        </Button>
                    </section>
                </RequestSelfAssessment>
            </Container>
        </MemberNavigationPage>
    );
}

const Container = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(4),
    overflowY: 'auto',
}));

const RequestSelfAssessment = styled(Stack)(({ theme }) => ({}));
