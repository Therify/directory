import { Box, CircularProgress, Tooltip as MuiTooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '@/lib/shared/components/themes/therify-design-system';
import {
    H4,
    Paragraph,
    Caption,
    CenteredContainer,
} from '@/lib/shared/components/ui';
import { getCoveredSessionsMessage } from '../../utils';
import { ProviderClientDetailsPageProps } from '../../../../service/page-props/get-client-details-page-props';
import { InfoOutlined } from '@mui/icons-material';

export const ProfileDetails = ({
    givenName,
    memberProfile,
    plan,
    isLoading,
}: ProviderClientDetailsPageProps['connectionRequest']['member'] & {
    isLoading?: boolean;
}) => {
    const remainingSessions = plan?.remainingSessions ?? 0;
    const coveredSessions = plan?.coveredSessions ?? 0;
    const hasRemainingSessions = remainingSessions > 0;
    return (
        <Container>
            <RemainingSessions hasRemainingSessions={hasRemainingSessions}>
                {isLoading ? (
                    <CenteredContainer marginBottom={4}>
                        <CircularProgress
                            color={hasRemainingSessions ? 'success' : 'info'}
                        />
                    </CenteredContainer>
                ) : (
                    <Paragraph className="count" bold>
                        {remainingSessions}
                    </Paragraph>
                )}
                <Caption margin={0}>
                    Covered {remainingSessions === 1 ? 'session' : 'sessions'}{' '}
                    {coveredSessions > 0 ? 'remaining' : ''}
                </Caption>
                <Tooltip
                    title={
                        plan
                            ? getCoveredSessionsMessage({
                                  name: givenName,
                                  coveredSessions: coveredSessions,
                                  remainingSessions,
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

const RemainingSessions = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasRemainingSessions',
})<{
    hasRemainingSessions: boolean;
}>(({ theme, hasRemainingSessions }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '180px',
    background: hasRemainingSessions
        ? colors.success[50]
        : colors.neutral.black[100],
    color: hasRemainingSessions ? colors.success[800] : theme.palette.info.dark,
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
