import { styled } from '@mui/material/styles';

export const UnderlinedButton = styled('button')(({ theme }) => ({
    textDecoration: 'underline',
    background: 'transparent',
    border: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
}));
