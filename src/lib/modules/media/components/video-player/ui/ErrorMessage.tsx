import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Paragraph, H3 } from '@/lib/shared/components/ui';
import { InfoOutlined } from '@mui/icons-material';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    const theme = useTheme();
    return (
        <Container onClick={(e) => e.stopPropagation()}>
            <InfoOutlined
                sx={{
                    fontSize: theme.spacing(12),
                    marginBottom: theme.spacing(4),
                }}
            />
            <H3
                sx={{
                    marginBottom: theme.spacing(2),
                }}
            >
                Something went wrong!
            </H3>
            <Paragraph>{message}</Paragraph>
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    cursor: 'default',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 1,
}));
