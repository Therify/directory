import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { MessageName } from './MessageName';
import { MessageBubble } from '../MessageBubble';
import { Message, ChatUser } from '../types';
import { Avatar } from '@/lib/shared/components/ui';

export interface MessageGroupProps {
    messages: Message[];
    name: string;
    avatar?: string;
    status: ChatUser['status'];
    isMine: boolean;
}

export const MessageGroup = ({
    messages,
    name,
    avatar,
    status,
    isMine,
}: MessageGroupProps) => {
    const theme = useTheme();
    return (
        <Box
            display="flex"
            justifyContent={isMine ? 'flex-end' : 'flex-start'}
            alignItems="flex-start"
        >
            <MessagesContainer isMine={isMine}>
                {!isMine && (
                    <Avatar
                        alt={`${name}'s Avatar`}
                        src={avatar}
                        onlineStatus={status}
                    />
                )}
                <Box
                    style={{
                        marginLeft: isMine ? 0 : theme.spacing(4),
                        marginRight: isMine ? theme.spacing(4) : 0,
                    }}
                >
                    <MessageName
                        name={name}
                        isMine={isMine}
                        timestamp={messages[messages.length - 1].timestamp}
                    />
                    <Messages isMine={isMine}>
                        {messages.map((message) => (
                            <MessageBubble key={message.id} isMine={isMine}>
                                {message.content}
                            </MessageBubble>
                        ))}
                    </Messages>
                </Box>
            </MessagesContainer>
        </Box>
    );
};
const MessagesContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMine',
})<{ isMine: boolean }>(({ theme, isMine }) => ({
    width: '100%',
    maxWidth: '416px',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: isMine ? 'row-reverse' : 'row',
    marginBottom: theme.spacing(2),
}));

const Messages = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMine',
})<{ isMine: boolean }>(({ isMine }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMine ? 'flex-end' : 'flex-start',
    width: '100%',
    justifyContent: isMine ? 'flex-end' : 'flex-start',
}));
