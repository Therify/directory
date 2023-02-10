import { styled } from '@mui/material/styles';

export const Divider = styled('hr')(({ theme }) => ({
    width: '100%',
    opacity: 0.3,
    margin: theme.spacing(4, 0),
}));
