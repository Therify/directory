import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { MessageBubble } from '../MessageBubble';

export const TypingIndicator = () => {
    return (
        <MessageBubble isMine={false}>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Dot />
                <Dot />
                <Dot />
            </Box>
        </MessageBubble>
    );
};

const Dot = styled('span')(({ theme }) => ({
    display: 'inline-block',
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[500],
    marginRight: theme.spacing(1),
    animation: 'typing 1.2s infinite ease-in-out alternate',
    '&:nth-of-type(2)': {
        animationDelay: '.4s',
    },
    '&:nth-of-type(3)': {
        animationDelay: '.8s',
        marginRight: 0,
    },
    '@keyframes typing': {
        '0%': {
            opacity: 0.5,
        },
        '50%': {
            opacity: 1,
        },
        '100%': {
            opacity: 0.5,
        },
    },
}));
