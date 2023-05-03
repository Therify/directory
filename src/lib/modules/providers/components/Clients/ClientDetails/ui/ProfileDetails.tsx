import { Box, Tooltip as MuiTooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@/lib/shared/components/themes/therify-design-system';
import { H4, Paragraph, Caption } from '@/lib/shared/components/ui';
import { getCoveredSessionsMessage } from '../../utils';
import { ProviderClientDetailsPageProps } from '../../../../service/page-props/get-client-details-page-props';
import { InfoOutlined } from '@mui/icons-material';

export const ProfileDetails = ({
    givenName,
    memberProfile,
    plan,
}: ProviderClientDetailsPageProps['connectionRequest']['member']) => {
    const remainingSesssions = plan?.remainingSessions ?? 0;
    const coveredSessions = plan?.coveredSessions ?? 0;
    return (
        <Container>
            <RemainingSessions remainingSessions={remainingSesssions}>
                <Paragraph className="count" bold>
                    {remainingSesssions}
                </Paragraph>
                <Caption margin={0}>
                    Covered {remainingSesssions === 1 ? 'session' : 'sessions'}{' '}
                    {coveredSessions > 0 ? 'remaining' : ''}
                </Caption>
                <Tooltip
                    title={
                        plan
                            ? getCoveredSessionsMessage({
                                  name: givenName,
                                  coveredSessions: coveredSessions,
                                  remainingSessions: remainingSesssions,
                                  planEndDate: plan.endDate,
                              })
                            : 'No plan information could be found.'
                    }
                >
                    <InfoOutlined fontSize="small" />
                </Tooltip>
            </RemainingSessions>
            <DetailsContainer>
                <H4>Concerns</H4>
                {memberProfile.concerns.length === 0 && (
                    <Paragraph>No concerns selected.</Paragraph>
                )}
                {memberProfile.concerns.length && (
                    <Paragraph>{memberProfile.concerns.join(', ')}</Paragraph>
                )}
                <H4>Goals</H4>
                {memberProfile.goals.length === 0 && (
                    <Paragraph>No goals shared.</Paragraph>
                )}
                {memberProfile.goals.length && (
                    <Paragraph>{memberProfile.goals.join(', ')}</Paragraph>
                )}
            </DetailsContainer>
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    flex: 1,
    [theme.breakpoints.up('md')]: {
        marginTop: 0,
    },
}));

const RemainingSessions = styled(Box)<{
    remainingSessions: number;
}>(({ theme, remainingSessions }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '180px',
    background:
        remainingSessions > 0 ? colors.success[50] : colors.neutral.black[100],
    color:
        remainingSessions > 0 ? colors.success[800] : theme.palette.info.dark,
    borderRadius: theme.shape.borderRadius,
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        width: '50%',
        maxWidth: '350px',
        marginRight: theme.spacing(8),
    },
    '& .count': {
        fontSize: theme.typography.h1.fontSize,
    },
}));

const Tooltip = styled(MuiTooltip)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));
