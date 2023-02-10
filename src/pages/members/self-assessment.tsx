import { H2, H6, Paragraph } from '@/components/ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { Goal } from '@/lib/types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export default function SelfAssessmentPage() {
    return (
        <Container>
            <PageHeader title="Self-Assessment" />
            <SubtitleContainer>
                <Subtitle>Tell use about your goals and preferences</Subtitle>
                <Paragraph>
                    This information helps us find the best match for you.
                </Paragraph>
            </SubtitleContainer>
            <GoalsContainer>
                <H6>Tell us about your goals</H6>
                <Paragraph>
                    Select any number of topics that are relevant to you.
                </Paragraph>
                <GoalGrid>
                    {Goal.ENTRIES.map((goal) => {
                        return (
                            <GoalCard key={goal}>
                                <Paragraph fontWeight={'bold'}>
                                    {goal}
                                </Paragraph>
                            </GoalCard>
                        );
                    })}
                </GoalGrid>
            </GoalsContainer>
            <PreferencesContainer>
                <H6>Who would you like to connect with?</H6>
                <Paragraph>
                    Our providers represent all backgrounds and identities.
                </Paragraph>
            </PreferencesContainer>
        </Container>
    );
}

const Container = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(4),
    overflowY: 'auto',
}));

const PageSection = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(20),
}));

const SubtitleContainer = styled(PageSection)(({ theme }) => ({}));

const Subtitle = styled(H2)(({ theme }) => ({
    ...theme.typography.h4,
}));

const GoalsContainer = styled(PageSection)(({ theme }) => ({}));

const GoalGrid = styled(Grid)(({ theme }) => ({
    display: 'grid',
    marginTop: theme.spacing(4),
    gridGap: theme.spacing(4),
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
}));

const GoalCard = styled(Box)(({ theme }) => ({
    background: theme.palette.secondary.light,
    text: theme.palette.secondary.contrastText,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const PreferencesContainer = styled(PageSection)(({ theme }) => ({}));
