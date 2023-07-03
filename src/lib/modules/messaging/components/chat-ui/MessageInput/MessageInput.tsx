import { styled, useTheme } from '@mui/material/styles';
import { Box, TextareaAutosize } from '@mui/material';
import { Button, IconButton } from '@/lib/shared/components/ui';
import { MoreHoriz, MoodRounded } from '@mui/icons-material';

interface MessageInputProps {
    value: string;
    onChange: (message: string) => void;
    onSend: () => void;
}

export const MessageInput = ({
    onChange,
    value,
    onSend,
}: MessageInputProps) => {
    const theme = useTheme();
    return (
        <InputContainer>
            <Input
                placeholder="Send a message"
                maxRows={6}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <ButtonContainer>
                <IconButton
                    type="text"
                    color="info"
                    size="small"
                    style={{
                        marginRight: theme.spacing(2),
                    }}
                >
                    <MoodRounded />
                </IconButton>
                <IconButton
                    type="text"
                    color="info"
                    size="small"
                    style={{
                        marginRight: theme.spacing(2),
                    }}
                >
                    <MoreHoriz />
                </IconButton>
                <Button
                    size="small"
                    disabled={value.trim() === ''}
                    onClick={onSend}
                >
                    Send
                </Button>
            </ButtonContainer>
        </InputContainer>
    );
};

const InputContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.shape.borderRadius,
}));

const Input = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    background: 'transparent',
    border: 'none',
    resize: 'none',
    '&:hover, &:focus, &:active, &:focus-visible': {
        background: 'transparent',
        border: 'none',
        outline: 0,
    },
}));

const ButtonContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
});
