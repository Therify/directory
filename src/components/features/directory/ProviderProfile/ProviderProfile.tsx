import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export function ProviderProfile() {
    return <ProfileContainer></ProfileContainer>;
}

const ProfileContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    overflowY: 'auto',
    background: 'white',
    padding: theme.spacing(2),
}));
