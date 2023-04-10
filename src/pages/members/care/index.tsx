import { RecommendationCard } from '@/lib/modules/directory/components/RecommendationCard/RecommendationCard';
import { membersService } from '@/lib/modules/members/service';
import { CarePageProps } from '@/lib/modules/members/service/get-care-page-props/getCarePageProps';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { PageHeader } from '@/lib/shared/components/ui/PageHeader/PageHeader';
import { H3 } from '@/lib/shared/components/ui/Typography/Headers';
import { Paragraph } from '@/lib/shared/components/ui/Typography/Paragraph';
import { RBAC } from '@/lib/shared/utils';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const getServerSideProps = RBAC.requireMemberAuth(
    membersService.getCarePageProps
);

export default function CarePage({ user, recommendations }: CarePageProps) {
    if (!recommendations) return null;
    const { idealMatches, concernsMatches, ethnicMatches, genderMatches } =
        recommendations;
    return (
        <MemberNavigationPage user={user} currentPath="/members/care">
            <CarePageContainer>
                <PageHeader
                    title="Here are a few providers that we recommend"
                    type="abstract2"
                    subtitleComponent={
                        <div>
                            <Paragraph>
                                The providers below are suited for your needs,
                                goals, and preferences. For additional options,
                                view our{' '}
                                <StyledLink href="/members/directory">
                                    provider directory
                                </StyledLink>
                                .
                            </Paragraph>
                        </div>
                    }
                />
                <RecommendationsContainer spacing={8}>
                    {idealMatches.length > 0 && (
                        <RecommendationsRow>
                            <H3>Best Matches</H3>
                            <Paragraph>
                                Providers who match all of your preferences.
                            </Paragraph>
                            <RecommendationsList>
                                {idealMatches.map((recommendation) => (
                                    <RecommendationCard
                                        key={recommendation.id}
                                        recommendation={recommendation}
                                    />
                                ))}
                            </RecommendationsList>
                        </RecommendationsRow>
                    )}
                    {concernsMatches.length > 0 && (
                        <RecommendationsRow>
                            <H3>Specialty Matches</H3>
                            <Paragraph>
                                Providers who specialize in addressing your
                                concerns.
                            </Paragraph>
                            <RecommendationsList>
                                {concernsMatches.map((recommendation) => (
                                    <RecommendationCard
                                        key={recommendation.id}
                                        recommendation={recommendation}
                                    />
                                ))}
                            </RecommendationsList>
                        </RecommendationsRow>
                    )}
                    {ethnicMatches.length > 0 && (
                        <RecommendationsRow>
                            <H3>Ethnicity Matches</H3>
                            <Paragraph>
                                Providers who match your ethnicity preference.
                            </Paragraph>
                            <RecommendationsList>
                                {ethnicMatches.map((recommendation) => (
                                    <RecommendationCard
                                        key={recommendation.id}
                                        recommendation={recommendation}
                                    />
                                ))}
                            </RecommendationsList>
                        </RecommendationsRow>
                    )}
                    {genderMatches.length > 0 && (
                        <RecommendationsRow>
                            <H3>Gender Matches</H3>
                            <Paragraph>
                                Providers who match your gender preference.
                            </Paragraph>
                            <RecommendationsList>
                                {genderMatches.map((recommendation) => (
                                    <RecommendationCard
                                        key={recommendation.id}
                                        recommendation={recommendation}
                                    />
                                ))}
                            </RecommendationsList>
                        </RecommendationsRow>
                    )}
                </RecommendationsContainer>
            </CarePageContainer>
        </MemberNavigationPage>
    );
}

const CarePageContainer = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    overflowY: 'auto',
    padding: theme.spacing(2),
    maxHeight: '100%',
}));

const RecommendationsContainer = styled(Stack)(({ theme }) => ({
    padding: `${theme.spacing(8)} 0`,
}));

const RecommendationsRow = styled(Stack)(({ theme }) => ({}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const RecommendationsList = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));
