import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MessageProps {
    children: ReactNode;
    isMine?: boolean;
}

export const MessageBubble = ({ children, isMine }: MessageProps) => {
    return <Bubble isMine={isMine}>{children}</Bubble>;
};

const Bubble = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMine',
})<{ isMine?: boolean }>(({ theme, isMine }) => ({
    display: 'inline-block',
    backgroundColor: isMine
        ? theme.palette.secondary.main
        : theme.palette.grey[100],
    padding: theme.spacing(4, 5),
    borderRadius: theme.spacing(3),
    ...(isMine
        ? { borderBottomRightRadius: 0 }
        : { borderBottomLeftRadius: 0 }),
    color: isMine
        ? theme.palette.secondary.contrastText
        : theme.palette.text.primary,
    textAlign: isMine ? 'right' : 'left',
    width: 'auto',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
}));
