import { useState } from 'react';
import { ConnectionRequest } from '@/lib/shared/types';
import { Stack, Link, Box, useMediaQuery } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
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
    Modal,
    Textarea,
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
} from '@mui/icons-material';
import { ConnectionStatus, ProfileType } from '@prisma/client';

const REIMBURSEMENT_REQUEST_URL =
    'https://hipaa.jotform.com/221371005584146?' as const;

interface ProviderClientListPageProps {
    connectionRequests: ConnectionRequest.Type[];
    designation: ProfileType;
}

export function ProviderClientListPage({
    connectionRequests,
    designation,
}: ProviderClientListPageProps) {
    const isCoach = designation === ProfileType.coach;
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );
    const hasConnectionRequests = connectionRequests.length > 0;
    const [targetConnection, setTargetConnection] =
        useState<ConnectionRequest.Type>();
    const [confirmAction, setConfirmAction] = useState<'accept' | 'decline'>();
    const [declineReason, setDeclineReason] = useState('');
    const setUpConfirmationModal = (
        action: 'accept' | 'decline',
        target: ConnectionRequest.Type
    ) => {
        setTargetConnection(target);
        setConfirmAction(action);
    };
    const clearConfirmationModal = () => {
        setTargetConnection(undefined);
        setConfirmAction(undefined);
    };
    return (
        <PageContainer>
            <Title>Clients</Title>
            <ListItem sx={{ width: '100%', '& > div': { paddingY: 0 } }}>
                <ClientListItemContainer paddingBottom={0}>
                    <CellContainer>
                        <Caption margin={0}>Name</Caption>
                    </CellContainer>
                    <CellContainer>
                        <Caption margin={0}>Email</Caption>
                    </CellContainer>
                    <CellContainer></CellContainer>
                </ClientListItemContainer>
            </ListItem>
            {!hasConnectionRequests && (
                <Paragraph>Your new referrals will appear here!</Paragraph>
            )}
            {hasConnectionRequests && (
                <ClientList>
                    {connectionRequests.map((connectionRequest) => {
                        return (
                            <ClientListItem
                                key={connectionRequest.member.id}
                                isSmallScreen={isSmallScreen}
                                connectionRequest={connectionRequest}
                                onAccept={() =>
                                    setUpConfirmationModal(
                                        'accept',
                                        connectionRequest
                                    )
                                }
                                onDecline={() =>
                                    setUpConfirmationModal(
                                        'decline',
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
            )}
            {!confirmAction && targetConnection && (
                <DisplayModal
                    isOpen
                    title={`${targetConnection.member.givenName} ${targetConnection.member.surname}`}
                    onClose={clearConfirmationModal}
                    fullWidthButtons
                    secondaryButtonText="Close"
                    secondaryButtonOnClick={clearConfirmationModal}
                >
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Located in
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.memberProfile.state}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Concerns
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.memberProfile.concerns}
                    </Paragraph>
                    <Paragraph bold size={PARAGRAPH_SIZE.LARGE}>
                        Goals
                    </Paragraph>
                    <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                        {targetConnection.member.memberProfile.goals}
                    </Paragraph>
                </DisplayModal>
            )}

            {confirmAction && targetConnection && (
                <Modal
                    isOpen
                    title={
                        confirmAction === 'accept'
                            ? 'Accept new client?'
                            : 'Decline new client'
                    }
                    message={
                        confirmAction === 'accept'
                            ? `Accepting ${targetConnection.member.givenName} will notify them that you are ready to start working together.`
                            : undefined
                    }
                    onClose={clearConfirmationModal}
                    fullWidthButtons
                    primaryButtonColor={
                        confirmAction === 'accept' ? 'primary' : 'error'
                    }
                    primaryButtonText={
                        confirmAction === 'accept' ? 'Accept' : 'Decline'
                    }
                    primaryButtonOnClick={() => {
                        console.log('TODO: implement accept/decline');
                        clearConfirmationModal();
                    }}
                    secondaryButtonText="Cancel"
                    secondaryButtonOnClick={clearConfirmationModal}
                    postBodySlot={
                        confirmAction === 'decline' && (
                            <Textarea
                                fullWidth
                                label="Reason for declining (optional)"
                                placeholder="Let them know why you may not be a great fit at this time"
                                value={declineReason}
                                onChange={(e) =>
                                    setDeclineReason(e.target.value)
                                }
                            />
                        )
                    }
                />
            )}
        </PageContainer>
    );
}

/* ---------------------------- Styled components --------------------------- */

const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10),
    width: '100%',
}));

const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    marginBottom: theme.spacing(1),
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

const MemberEmailAddress = styled('p')(({ theme }) => ({
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
    '& div': {
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
    '&:nth-of-type(1)': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
    },
    '&:nth-of-type(2)': {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            width: '30%',
            display: 'flex',
        },
    },
    '&:nth-of-type(3)': {
        width: '40%',
        justifyContent: 'flex-end',
        paddingLeft: theme.spacing(2),
    },
}));

const ClientListItem = ({
    connectionRequest,
    isSmallScreen,
    onAccept,
    onDecline,
    onView,
    onOpenChat,
}: {
    connectionRequest: ConnectionRequest.Type;
    isSmallScreen?: boolean;
    onAccept: () => void;
    onDecline: () => void;
    onView?: () => void;
    onOpenChat?: () => void;
}) => {
    const isPending = connectionRequest.connectionStatus === 'pending';
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
                      text: 'View',
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
                        <Box>{connectionRequest.member.emailAddress}</Box>
                    </MemberEmailAddress>
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
                            View
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
