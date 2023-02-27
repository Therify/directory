import { useState } from 'react';
import { ConnectionRequest } from '@/lib/shared/types';
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
} from '@/lib/shared/components/ui';
import {
    MailOutline,
    PaidOutlined,
    PendingOutlined,
    ChatBubbleOutlineRounded,
    CircleRounded,
    DoNotDisturbAltRounded,
    CheckCircleOutlineRounded,
    PreviewRounded,
    PersonRemoveOutlined,
} from '@mui/icons-material';
import { ConnectionStatus, ProfileType } from '@prisma/client';
import { format } from 'date-fns';

const REIMBURSEMENT_REQUEST_URL =
    'https://hipaa.jotform.com/221371005584146?' as const;

type HandleConnectionRequestAction = (
    connectionRequest: ConnectionRequest.Type
) => void;
interface ProviderClientListPageProps {
    connectionRequests: ConnectionRequest.Type[];
    designation: ProfileType;
    onAcceptConnectionRequest: HandleConnectionRequestAction;
    onDeclineConnectionRequest: HandleConnectionRequestAction;
    onTerminateConnectionRequest: HandleConnectionRequestAction;
}

export function ProviderClientListPage({
    connectionRequests,
    designation,
    onAcceptConnectionRequest,
    onDeclineConnectionRequest,
    onTerminateConnectionRequest,
}: ProviderClientListPageProps) {
    const theme = useTheme();
    const isCoach = designation === ProfileType.coach;
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );
    const hasConnectionRequests = connectionRequests.length > 0;
    const [targetConnection, setTargetConnection] =
        useState<ConnectionRequest.Type>();
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
                            <Caption margin={0}>Name</Caption>
                        </CellContainer>
                        <CellContainer>
                            <Caption margin={0}>Email</Caption>
                        </CellContainer>
                        <CellContainer>
                            <Caption margin={0}>Account</Caption>
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
                    connectionRequests.map((connectionRequest) => {
                        return (
                            <ClientListItem
                                key={connectionRequest.member.id}
                                isSmallScreen={isSmallScreen}
                                connectionRequest={connectionRequest}
                                onAccept={() =>
                                    onAcceptConnectionRequest(connectionRequest)
                                }
                                onDecline={() =>
                                    onDeclineConnectionRequest(
                                        connectionRequest
                                    )
                                }
                                onTerminate={() =>
                                    onTerminateConnectionRequest(
                                        connectionRequest
                                    )
                                }
                                onView={() =>
                                    setTargetConnection(connectionRequest)
                                }
                                onOpenChat={
                                    isCoach
                                        ? () => {
                                              console.log(
                                                  'TODO: implement chat'
                                              );
                                          }
                                        : undefined
                                }
                            />
                        );
                    })}
            </ClientList>
            {targetConnection && (
                <DisplayModal
                    isOpen
                    title={`${targetConnection.member.givenName} ${targetConnection.member.surname}`}
                    onClose={() => setTargetConnection(undefined)}
                    fullWidthButtons
                    secondaryButtonText="Close"
                    secondaryButtonOnClick={() =>
                        setTargetConnection(undefined)
                    }
                >
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
                        targetConnection.member.plan.coveredSessions > 0
                            ? `${targetConnection.member.givenName} has ${
                                  targetConnection.member.plan.coveredSessions
                              } covered sessions from Therify until ${format(
                                  new Date(
                                      targetConnection.member.plan.endDate
                                  ),
                                  'MMMM dd, yyyy'
                              )}`
                            : 'No covered sessions. They will likely be using their insurance benefit to cover session costs or will pay out of pocket.'}
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
                        {targetConnection.member.memberProfile.state}
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
}));

const ClientListItemContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
}));

const MemberName = styled(Paragraph)(({ theme }) => ({
    fontWeight: 500,
    margin: 0,
}));

const MemberEmailAddress = styled(Box)(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    maxWidth: '100%',
    '& a': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '& p': {
        flex: 1,
        maxWidth: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        alignItems: 'center',
    },
    '& svg': {
        color: theme.palette.grey[400],
        marginRight: theme.spacing(2),
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
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
    isSmallScreen,
    onAccept,
    onDecline,
    onTerminate,
    onView,
    onOpenChat,
}: {
    connectionRequest: ConnectionRequest.Type;
    isSmallScreen?: boolean;
    onAccept: () => void;
    onDecline: () => void;
    onTerminate: () => void;
    onView?: () => void;
    onOpenChat?: () => void;
}) => {
    const isPending =
        connectionRequest.connectionStatus === ConnectionStatus.pending;
    const isAccepted =
        connectionRequest.connectionStatus === ConnectionStatus.accepted;
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
              ]
            : []),
        ...(!onOpenChat
            ? [
                  {
                      icon: <PreviewRounded />,
                      text: ' View Member Details',
                      onClick: onView,
                  },
              ]
            : []),
        ...(onOpenChat
            ? [
                  {
                      icon: <ChatBubbleOutlineRounded />,
                      text: 'Chat',
                      onClick: onOpenChat,
                  },
              ]
            : []),
    ];
    const actionList = [
        ...(isSmallScreen ? mobileActions : []),
        ...(isAccepted
            ? [
                  {
                      text: 'Reimbursement Request',
                      icon: <PaidOutlined />,
                      onClick: () => {
                          window.open(
                              formatReimbursementRequestUrl(
                                  REIMBURSEMENT_REQUEST_URL,
                                  connectionRequest
                              ),
                              '_blank'
                          );
                      },
                  },
                  {
                      text: 'Remove Client',
                      icon: <PersonRemoveOutlined />,
                      onClick: onTerminate,
                  },
              ]
            : []),
    ];

    return (
        <ListItem
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
                            Pending
                        </Badge>
                    )}
                </CellContainer>
                <CellContainer>
                    <MemberEmailAddress>
                        <Link
                            title={`Send email to ${connectionRequest.member.givenName}`}
                            onClick={(e) => e.stopPropagation()}
                            href={`mailto:${connectionRequest.member.emailAddress}`}
                            target="_blank"
                        >
                            <MailOutline />
                        </Link>
                        <Paragraph noMargin>
                            {connectionRequest.member.emailAddress}
                        </Paragraph>
                    </MemberEmailAddress>
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
                            onOpenChat={onOpenChat}
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
                                        Pending
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
    onOpenChat,
}: {
    connectionRequest: ConnectionRequest.Type;
    onAccept: () => void;
    onDecline: () => void;
    onView?: () => void;
    onOpenChat?: () => void;
}) => {
    const isPending =
        connectionRequest.connectionStatus === ConnectionStatus.pending;
    const isAccepted =
        connectionRequest.connectionStatus === ConnectionStatus.accepted;
    return (
        <>
            {isPending && (
                <>
                    <Button
                        size="small"
                        onClick={onAccept}
                        sx={{ marginRight: 2 }}
                    >
                        Accept
                    </Button>
                    <Button
                        size="small"
                        type="outlined"
                        color="info"
                        onClick={onDecline}
                    >
                        Decline
                    </Button>
                </>
            )}
            {isAccepted && (
                <>
                    {!onOpenChat && (
                        <Button
                            size="small"
                            color="info"
                            type="outlined"
                            onClick={onView}
                        >
                            View Member
                        </Button>
                    )}
                    {onOpenChat && (
                        <Button
                            size="small"
                            color="info"
                            type="outlined"
                            onClick={onOpenChat}
                        >
                            Chat
                        </Button>
                    )}
                </>
            )}
        </>
    );
};
