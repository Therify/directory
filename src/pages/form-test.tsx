import { MemberRegistrationForm } from '@/lib/modules/registration/components/v3/MemberRegistrationFlow/ui';
import { CenteredContainer, AbstractShape1 } from '@/lib/shared/components/ui';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

export default function Test() {
    const theme = useTheme();
    return (
        <Box
            padding={8}
            overflow="auto"
            width="100vw"
            height="100vh"
            style={{ background: theme.palette.background.default }}
        >
            <MemberRegistrationForm />
        </Box>
    );
}
const Shape = styled(AbstractShape1)(() => ({
    position: 'absolute',
    width: '250px',
    top: -100,
    right: -100,
    transform: 'rotate(-90deg)',
    zIndex: 1,
}));
const Container = styled(Box)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(10),
    maxWidth: '800px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));
const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& > button': {
        flex: 1,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            '&:first-of-type': {
                marginRight: theme.spacing(2),
            },
        },
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));
