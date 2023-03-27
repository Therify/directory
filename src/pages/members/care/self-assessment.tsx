import { PHQ9Form } from '@/lib/modules/members/components/PHQ9Form/PHQ9Form';
import { SelfAssessmentForm } from '@/lib/modules/members/components/SelfAssessmentForm';
import { membersService } from '@/lib/modules/members/service';
import { SelfAssessmentPageProps } from '@/lib/modules/members/service/get-self-assessment-page-props/getSelfAssessmentPageProps';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { PageHeader } from '@/lib/shared/components/ui/PageHeader';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const getServerSideProps = membersService.getSelfAssessmentPageProps;

export default function SelfAssessmentPage({ user }: SelfAssessmentPageProps) {
    return (
        <MemberNavigationPage
            user={user}
            currentPath="/members/self-assessment"
        >
            <PageContainer>
                <PageHeader
                    title="Let’s find you the best care"
                    subtitle="This information helps us find the best match for you."
                    type="secondary"
                />
                <SelfAssessmentForm />
            </PageContainer>
        </MemberNavigationPage>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Styled Components                             */
/* -------------------------------------------------------------------------- */

const PageContainer = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    height: '100%',
    overflow: 'auto',
    margin: '0 auto',
    paddingTop: theme.spacing(8),
}));
