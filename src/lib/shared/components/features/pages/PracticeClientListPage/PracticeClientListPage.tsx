import { useState } from 'react';
import { PracticeProfileConnectionRequests } from '@/lib/shared/types';
import { Stack, Link, Box, useMediaQuery } from '@mui/material';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { formatReimbursementRequestUrl } from '@/lib/shared/utils';
import {
    List,
    H1,
    Paragraph,
    PARAGRAPH_SIZE,
    FloatingList,
    Avatar,
    Button,
    AVATAR_SIZE,
    Caption,
    Badge,
    BADGE_SIZE,
    BADGE_COLOR,
    ListItem,
    DisplayModal,
    IconButton,
} from '@/lib/shared/components/ui';
import {
    MailOutline,
    PaidOutlined,
    PendingOutlined,
    CircleRounded,
    DoNotDisturbAltRounded,
    CheckCircleOutlineRounded,
    PreviewRounded,
    EmailOutlined,
} from '@mui/icons-material';
import { ConnectionStatus } from '@prisma/client';
import { getCoveredSessionsMessage } from '@/lib/modules/providers/components/Clients/utils';

const REIMBURSEMENT_REQUEST_URL =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? ('https://hipaa.jotform.com/221371005584146' as const)
        : ('https://form.jotform.com/230950700793153' as const);

type ProfileConnectionRequest =
    PracticeProfileConnectionRequests.Type['profileConnectionRequests'][number]['connectionRequests'][number];
type ConnectionProviderProfile =
    PracticeProfileConnectionRequests.Type['profileConnectionRequests'][number]['providerProfile'];
type ConnectionActionHandler = (ids: {
    memberId: string;
    profileId: string;
}) => void;
interface PracticeClientListPageProps {
    practiceConnectionRequests: PracticeProfileConnectionRequests.Type;
    onAcceptConnectionRequest: ConnectionActionHandler;
    onDeclineConnectionRequest: ConnectionActionHandler;
    onTerminateConnectionRequest: ConnectionActionHandler;
    onReimbursementRequest: ConnectionActionHandler;
    useIframeReimbursementRequest: boolean;
}

export function PracticeClientListPage({
    practiceConnectionRequests,
    onAcceptConnectionRequest,
    onDeclineConnectionRequest,
    onTerminateConnectionRequest,
    onReimbursementRequest,
    useIframeReimbursementRequest,
}: PracticeClientListPageProps) {
    const { profileConnectionRequests, practice } = practiceConnectionRequests;
    const { pendingConnectionRequests, acceptedConnectionRequests } =
        profileConnectionRequests.reduce<{
            pendingConnectionRequests: PracticeProfileConnectionRequests.Type['profileConnectionRequests'];
            acceptedConnectionRequests: PracticeProfileConnectionRequests.Type['profileConnectionRequests'];
        }>(
            (acc, profile) => {
                const { connectionRequests } = profile;
                const pendingConnectionRequest: typeof connectionRequests = [];
                const acceptedConnectionRequest: typeof connectionRequests = [];

                connectionRequests.forEach((connectionRequest) => {
                    if (
                        connectionRequest.connectionStatus ===
                        ConnectionStatus.pending
                    ) {
                        pendingConnectionRequest.push(connectionRequest);
                    }
                    if (
                        connectionRequest.connectionStatus ===
                        ConnectionStatus.accepted
                    ) {
                        acceptedConnectionRequest.push(connectionRequest);
                    }
                });

                return {
                    pendingConnectionRequests: [
                        ...acc.pendingConnectionRequests,
                        ...(pendingConnectionRequest.length > 0
                            ? [
                                  {
                                      ...profile,
                                      connectionRequests:
                                          pendingConnectionRequest,
                                  },
                              ]
                            : []),
                    ],
                    acceptedConnectionRequests: [
                        ...acc.acceptedConnectionRequests,
                        ...(acceptedConnectionRequest.length > 0
                            ? [
                                  {
                                      ...profile,
                                      connectionRequests:
                                          acceptedConnectionRequest,
                                  },
                              ]
                            : []),
                    ],
                };
            },
            { pendingConnectionRequests: [], acceptedConnectionRequests: [] }
        );
    const theme = useTheme();
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );
    const hasConnectionRequests = profileConnectionRequests.length > 0;
    const [targetConnection, setTargetConnection] = useState<
        ProfileConnectionRequest & {
            providerProfile: ConnectionProviderProfile;
        }
    >();
    return (
        <PageContainer>
            <Box
                marginBottom={theme.spacing(1)}
                marginTop={theme.spacing(10)}
                marginX={theme.spacing(5)}
            >
                <Title>Clients</Title>
            </Box>
            <ClientList>
                <ListItem sx={{ width: '100%', '& > div': { paddingY: 0 } }}>
                    <ClientListItemContainer paddingBottom={0}>
                        <CellContainer>
                            <Caption margin={0}>Client Name</Caption>
                        </CellContainer>
                        <CellContainer>
                            <Caption margin={0}>Provider Name</Caption>
                        </CellContainer>
                        <CellContainer>
                            <Caption margin={0}>Client Account</Caption>
                        </CellContainer>
                        <CellContainer></CellContainer>
                    </ClientListItemContainer>
                </ListItem>
                {!hasConnectionRequests && (
                    <Box margin={5}>
                        <Paragraph
                            style={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            No clients to show. Your future referrals will
                            appear here.
                        </Paragraph>
                    </Box>
                )}
                {hasConnectionRequests &&
                    [pendingConnectionRequests, acceptedConnectionRequests].map(
                        (requests, i) => {
                            const isRequests = requests.length > 0;
                            const isPendingRequests = i === 0;
                            return (
                                <Box width="100%" key={i}>
                                    {isPendingRequests && isRequests && (
                                        <Badge
                                            color="warning"
                                            style={{
                                                margin: theme.spacing(5, 5, 2),
                                            }}
                                        >
                                            Referrals awaiting response
                                        </Badge>
                                    )}
                                    {!isPendingRequests && isRequests && (
                                        <Badge
                                            color="neutral-light"
                                            style={{
                                                margin: theme.spacing(5, 5, 2),
                                            }}
                                        >
                                            Your Clients
                                        </Badge>
                                    )}
                                    {requests.map((profileConnection) => {
                                        const {
                                            connectionRequests,
                                            providerProfile,
                                        } = profileConnection;
                                        return (
                                            <div key={providerProfile.id}>
                                                {connectionRequests.map(
                                                    (connectionRequest) => (
                                                        <ClientListItem
                                                            key={
                                                                connectionRequest
                                                                    .member.id
                                                            }
                                                            providerProfile={
                                                                providerProfile
                                                            }
                                                            practice={practice}
                                                            isSmallScreen={
                                                                isSmallScreen
                                                            }
                                                            connectionRequest={
                                                                connectionRequest
                                                            }
                                                            onReimbursementRequest={
                                                                useIframeReimbursementRequest
                                                                    ? () =>
                                                                          onReimbursementRequest(
                                                                              {
                                                                                  memberId:
                                                                                      connectionRequest
                                                                                          .member
                                                                                          .id,
                                                                                  profileId:
                                                                                      providerProfile.id,
                                                                              }
                                                                          )
                                                                    : undefined
                                                            }
                                                            onAccept={() =>
                                                                onAcceptConnectionRequest(
                                                                    {
                                                                        memberId:
                                                                            connectionRequest
                                                                                .member
                                                                                .id,
                                                                        profileId:
                                                                            providerProfile.id,
                                                                    }
                                                                )
                                                            }
                                                            onDecline={() =>
                                                                onDeclineConnectionRequest(
                                                                    {
                                                                        memberId:
                                                                            connectionRequest
                                                                                .member
                                                                                .id,
                                                                        profileId:
                                                                            providerProfile.id,
                                                                    }
                                                                )
                                                            }
                                                            onTerminate={() =>
                                                                onTerminateConnectionRequest(
                                                                    {
                                                                        memberId:
                                                                            connectionRequest
                                                                                .member
                                                                                .id,
                                                                        profileId:
                                                                            providerProfile.id,
                                                                    }
                                                                )
                                                            }
                                                            onView={() =>
                                                                setTargetConnection(
                                                                    {
                                                                        ...connectionRequest,
                                                                        providerProfile,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        );
                                    })}
                                </Box>
                            );
                        }
                    )}
            </ClientList>
            {targetConnection && (
                <DisplayModal
                    isOpen
                    title={`${targetConnection.member.givenName} ${targetConnection.member.surname}`}
                    onClose={() => setTargetConnection(undefined)}
                    fullWidthButtons
                    secondaryButtonText={
                        targetConnection.connectionStatus ===
                        ConnectionStatus.pending
                            ? 'Decline'
                            : 'Close'
                    }
                    secondaryButtonOnClick={() => {
                        setTargetConnection(undefined);
                        if (
                            targetConnection.connectionStatus ===
                            ConnectionStatus.pending
                        ) {
                            return onDeclineConnectionRequest({
                                memberId: targetConnection.member.id,
                                profileId: targetConnection.providerProfile.id,
                            });
                        }
                    }}
                    {...(targetConnection.connectionStatus ===
                    ConnectionStatus.pending
                        ? {
                              primaryButtonText: 'Accept',
                              primaryButtonOnClick: () => {
                                  setTargetConnection(undefined);
                                  onAcceptConnectionRequest({
                                      memberId: targetConnection.member.id,
                                      profileId:
                                          targetConnection.providerProfile.id,
                                  });
                              },
                          }
                        : {
                              primaryButtonText: undefined,
                              primaryButtonOnClick: undefined,
                          })}
                >
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        {targetConnection.connectionStatus ===
                        ConnectionStatus.pending
                            ? 'Requested Provider'
                            : 'Provider'}
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.providerProfile.givenName}{' '}
                        {targetConnection.providerProfile.surname}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Account
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.account.name}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Payment
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.plan &&
                            getCoveredSessionsMessage({
                                coveredSessions:
                                    targetConnection.member.plan
                                        .coveredSessions,
                                remainingSessions:
                                    targetConnection.member.plan
                                        .remainingSessions,
                                name: targetConnection.member.givenName,
                                planEndDate:
                                    targetConnection.member.plan.endDate,
                            })}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Contact
                    </Paragraph>
                    <Link
                        href={'mailto:' + targetConnection.member.emailAddress}
                        target="_blank"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                            {targetConnection.member.emailAddress}
                        </Paragraph>
                    </Link>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Located in
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.memberProfile.state},{' '}
                        {targetConnection.member.memberProfile.country}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Insurance Provider
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.memberProfile.insurance}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Concerns
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.memberProfile.concerns.join(
                            ', '
                        )}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Goals
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.memberProfile.goals.join(', ')}
                    </Paragraph>
                    {targetConnection.connectionMessage && (
                        <>
                            <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                                Message
                            </Paragraph>
                            <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                                {targetConnection.connectionMessage}
                            </Paragraph>
                        </>
                    )}
                </DisplayModal>
            )}
        </PageContainer>
    );
}

/* ---------------------------- Styled components --------------------------- */

const PageContainer = styled(Box)(({ theme }) => ({
    width: '100%',
}));

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
}));

const ClientList = styled(List)(({ theme }) => ({
    width: '100%',
    paddingX: theme.spacing(4),
}));

const ClientListItemContainer = styled(Stack)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
}));

const MemberName = styled(Paragraph)(({ theme }) => ({
    fontWeight: 500,
    margin: 0,
}));

const CellContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingRight: theme.spacing(2),
    '&:nth-of-type(1)': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: '25%',
        },
    },
    '&:nth-of-type(2)': {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            width: '25%',
            display: 'flex',
        },
    },
    '&:nth-of-type(3)': {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            width: '25%',
            display: 'flex',
        },
    },
    '&:nth-of-type(4)': {
        width: '25%',
        justifyContent: 'flex-end',
    },
}));

const ClientListItem = ({
    connectionRequest,
    providerProfile,
    practice,
    isSmallScreen,
    onAccept,
    onDecline,
    onView,
    onTerminate,
    onEmail,
    onReimbursementRequest,
}: {
    connectionRequest: ProfileConnectionRequest;
    providerProfile: ConnectionProviderProfile;
    practice: PracticeProfileConnectionRequests.Type['practice'];
    isSmallScreen?: boolean;
    onAccept: () => void;
    onDecline: () => void;
    onReimbursementRequest?: () => void;
    onView?: () => void;
    onTerminate?: () => void;
    onEmail?: () => void;
}) => {
    const isPending =
        connectionRequest.connectionStatus === ConnectionStatus.pending;
    const isAccepted =
        connectionRequest.connectionStatus === ConnectionStatus.accepted;
    const hasRemainingCoveredSessions =
        connectionRequest.member.plan?.remainingSessions ?? 0 > 0;
    const mobileActions = [
        ...(isPending
            ? [
                  {
                      icon: <CheckCircleOutlineRounded color="success" />,
                      text: 'Accept',
                      onClick: onAccept,
                  },
                  {
                      icon: <DoNotDisturbAltRounded color="error" />,
                      text: 'Decline',
                      onClick: onDecline,
                  },
                  {
                      icon: <EmailOutlined />,
                      text: 'Send Email',
                      onClick: onEmail,
                  },
              ]
            : [
                  {
                      icon: <PreviewRounded />,
                      text: ' View Member Details',
                      onClick: onView,
                  },
              ]),
    ];
    const actionList = [
        ...(isSmallScreen ? mobileActions : []),
        ...(isAccepted
            ? [
                  {
                      icon: <EmailOutlined />,
                      text: 'Send Email',
                      onClick: onEmail,
                  },
                  ...(hasRemainingCoveredSessions
                      ? [
                            {
                                text: 'Reimbursement Request',
                                icon: <PaidOutlined />,
                                onClick: () => {
                                    if (onReimbursementRequest) {
                                        // feature flag is on
                                        onReimbursementRequest();
                                        return;
                                    }
                                    window.open(
                                        formatReimbursementRequestUrl({
                                            baseUrl: REIMBURSEMENT_REQUEST_URL,
                                            designation:
                                                providerProfile.designation,
                                            connectionRequest: {
                                                ...connectionRequest,
                                                providerProfile: {
                                                    ...providerProfile,
                                                    practice,
                                                },
                                            },
                                        }),
                                        '_blank'
                                    );
                                },
                            },
                        ]
                      : []),
                  ...(onTerminate
                      ? [
                            // TODO: We need to be able to handle this without breaking confidentiality
                            // {
                            //     icon: <PersonRemoveOutlined />,
                            //     text: 'Remove Client',
                            //     onClick: onTerminate,
                            // },
                        ]
                      : []),
              ]
            : []),
    ];

    return (
        <ListItem
            disablePadding
            key={connectionRequest.member.id}
            sx={{ width: '100%', paddingX: 0 }}
            onClick={onView}
        >
            <ClientListItemContainer>
                <CellContainer>
                    <Avatar
                        size={AVATAR_SIZE.EXTRA_SMALL}
                        sx={{ marginRight: 4 }}
                    />
                    <MemberName
                        sx={{
                            marginRight:
                                isPending && !isSmallScreen ? 4 : undefined,
                        }}
                    >
                        {connectionRequest.member.givenName}{' '}
                        {connectionRequest.member.surname}
                    </MemberName>
                    {isPending && !isSmallScreen && (
                        <Badge
                            color={BADGE_COLOR.WARNING}
                            icon={<PendingOutlined />}
                            size={BADGE_SIZE.SMALL}
                        >
                            New
                        </Badge>
                    )}
                </CellContainer>
                <CellContainer>
                    <Paragraph noMargin>
                        {providerProfile.givenName} {providerProfile.surname}
                    </Paragraph>
                </CellContainer>
                <CellContainer>
                    <Paragraph noMargin>
                        {connectionRequest.member.account.name}
                    </Paragraph>
                </CellContainer>
                <CellContainer onClick={(e) => e.stopPropagation()}>
                    {!isSmallScreen && (
                        <ActionButtons
                            connectionRequest={connectionRequest}
                            onAccept={onAccept}
                            onDecline={onDecline}
                            onView={onView}
                        />
                    )}
                    {isPending && isSmallScreen && (
                        <CircleRounded
                            color="warning"
                            sx={{
                                height: '12px',
                                width: '12px',
                            }}
                        />
                    )}
                    {actionList.length > 0 && (
                        <FloatingList
                            sx={{ marginLeft: 2 }}
                            headerSlot={
                                isPending &&
                                isSmallScreen && (
                                    <Badge
                                        color={BADGE_COLOR.WARNING}
                                        icon={<PendingOutlined />}
                                        size={BADGE_SIZE.SMALL}
                                    >
                                        New Referral
                                    </Badge>
                                )
                            }
                            listItems={actionList}
                        />
                    )}
                </CellContainer>
            </ClientListItemContainer>
        </ListItem>
    );
};

const ActionButtons = ({
    connectionRequest,
    onAccept,
    onDecline,
    onView,
}: {
    connectionRequest: ProfileConnectionRequest;
    onAccept: () => void;
    onDecline: () => void;
    onView?: () => void;
}) => {
    const isPending =
        connectionRequest.connectionStatus === ConnectionStatus.pending;
    const isAccepted =
        connectionRequest.connectionStatus === ConnectionStatus.accepted;
    return (
        <>
            {isPending && (
                <>
                    <IconButton
                        size="small"
                        type="outlined"
                        color="info"
                        onClick={() => {
                            window?.open(
                                `mailto:${connectionRequest.member.emailAddress}`
                            );
                        }}
                    >
                        <MailOutline />
                    </IconButton>
                    <Button
                        size="small"
                        onClick={onAccept}
                        sx={{ marginLeft: 2 }}
                    >
                        Accept
                    </Button>
                    <Button
                        size="small"
                        type="outlined"
                        color="info"
                        onClick={onDecline}
                        sx={{ marginLeft: 2 }}
                    >
                        Decline
                    </Button>
                </>
            )}
            {isAccepted && (
                <Button
                    size="small"
                    color="info"
                    type="outlined"
                    onClick={onView}
                >
                    View Member
                </Button>
            )}
        </>
    );
};
