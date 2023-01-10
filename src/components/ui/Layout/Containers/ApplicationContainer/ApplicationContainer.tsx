import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ApplicationContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    width: '100vw',
    position: 'relative',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
}));
