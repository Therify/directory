import { ConnectionRequest } from '@/lib/shared/types';
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

import {
    Paragraph,
    FloatingList,
    Avatar,
    AVATAR_SIZE,
    Badge,
    BADGE_SIZE,
    BADGE_COLOR,
    ListItem,
} from '@/lib/shared/components/ui';
import { ConnectionStatus } from '@prisma/client';
import { Box, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ActionButtons } from './ActionButtons';
import { CellContainer, ClientListItemContainer } from './ListCells';

export const ClientListItem = ({
    connectionRequest,
    isSmallScreen,
    onAccept,
    onDecline,
    onTerminate,
    onView,
    onOpenChat,
    onReimbursmentRequest,
}: {
    connectionRequest: ConnectionRequest.Type;
    isSmallScreen?: boolean;
    onAccept: () => void;
    onDecline: () => void;
    onTerminate: () => void;
    onView?: () => void;
    onOpenChat?: () => void;
    onReimbursmentRequest: () => void;
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
                      onClick: onReimbursmentRequest,
                  },
                  // TODO: We need to be able to handle this without breaking confidentiality
                  //   {
                  //       text: 'Remove Client',
                  //       icon: <PersonRemoveOutlined />,
                  //       onClick: onTerminate,
                  //   },
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
