import {
    CenteredContainer,
    Avatar,
    Paragraph,
} from '@/lib/shared/components/ui';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Circle from '@mui/icons-material/Circle';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { ChatUser } from '../../types';

interface ChannelProps {
    isSelected: boolean;
    authorStatus: ChatUser['status'];
    caseStatus: 'active' | 'resolved';
    title: string;
    lastMessage: string;
    lastMessageTimestamp: string;
    authorAvatarUrl?: string;
    authorName: string;
    unreadMessages?: number;
}

export const Channel = ({
    isSelected,
    authorStatus,
    caseStatus,
    title,
    lastMessage,
    lastMessageTimestamp,
    authorAvatarUrl,
    authorName,
    unreadMessages = 0,
}: ChannelProps) => {
    const theme = useTheme();
    return (
        <ChannelContainer isSelected={isSelected}>
            <Avatar
                alt={`${authorName} avatar`}
                src={authorAvatarUrl}
                onlineStatus={authorStatus}
            />
            <Box flex={1} maxWidth="70%" paddingLeft={theme.spacing(4)}>
                <Box
                    display="flex"
                    fontSize="12px"
                    textTransform="uppercase"
                    color={theme.palette.info.main}
                    marginBottom={theme.spacing(2)}
                    fontWeight={500}
                >
                    {caseStatus === 'resolved' ? (
                        <ResolvedStatus />
                    ) : (
                        <ActiveStatus />
                    )}
                    <span style={{ margin: theme.spacing(0, 2) }}>|</span>
                    {format(new Date(lastMessageTimestamp), 'LLL dd')}
                </Box>
                <Paragraph bold noMargin>
                    {title}
                </Paragraph>
                <Paragraph
                    noMargin
                    sx={(theme) => ({
                        fontSize: '12px',
                        fontWeight: unreadMessages > 0 ? 500 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color:
                            unreadMessages > 0
                                ? theme.palette.text.primary
                                : theme.palette.text.secondary,
                    })}
                >
                    {lastMessage}
                </Paragraph>
            </Box>
            <CenteredContainer flexShrink={0} marginLeft={theme.spacing(2)}>
                {unreadMessages > 0 ? (
                    <Box
                        sx={(theme) => ({
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '22px',
                            width: '22px',
                            borderRadius: '50%',
                            textAlign: 'center',
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.error.contrastText,
                        })}
                    >
                        {unreadMessages}
                    </Box>
                ) : (
                    <ChevronRightRounded />
                )}
            </CenteredContainer>
        </ChannelContainer>
    );
};

const ChannelContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    cursor: 'pointer',
    padding: theme.spacing(4, 6),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: isSelected ? theme.palette.grey[50] : 'transparent',
    ':hover': {
        backgroundColor: theme.palette.grey[50],
    },
}));

const ActiveStatus = () => (
    <Box
        sx={{
            color: 'success.main',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
        }}
    >
        <Circle
            sx={(theme) => ({
                marginRight: theme.spacing(2),
                fontSize: '12px',
                color: theme.palette.success.main,
            })}
        />
        ACTIVE
    </Box>
);
const ResolvedStatus = () => (
    <Box
        sx={{
            fontSize: '12px',
            color: 'info.main',
            display: 'flex',
            alignItems: 'center',
        }}
    >
        <CheckCircle
            sx={(theme) => ({
                marginRight: theme.spacing(2),
                fontSize: '12px',
                color: theme.palette.info.main,
            })}
        />
        RESOLVED
    </Box>
);
