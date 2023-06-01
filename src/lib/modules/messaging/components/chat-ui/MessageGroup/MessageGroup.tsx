import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar } from './Avatar';
import { MessageName } from './MessageName';
import { MessageBubble } from '../MessageBubble';

interface Message {
    id: string;
    content: string;
    timestamp: Date;
}

export interface MessageGroupProps {
    messages: Message[];
    name: string;
    avatar: string;
    isOnline: boolean;
    isMine: boolean;
}

export const MessageGroup = ({
    messages,
    name,
    avatar,
    isOnline,
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
                    <Avatar name={name} src={avatar} isOnline={isOnline} />
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
