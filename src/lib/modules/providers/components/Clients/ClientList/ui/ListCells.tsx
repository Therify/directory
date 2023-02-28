import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CellContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingRight: theme.spacing(2),
    '&:nth-of-type(1)': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: '25%',
        },
    },
    '&:nth-of-type(2)': {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            width: '25%',
            display: 'flex',
        },
    },
    '&:nth-of-type(3)': {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            width: '25%',
            display: 'flex',
        },
    },
    '&:nth-of-type(4)': {
        width: '25%',
        justifyContent: 'flex-end',
    },
}));

export const ClientListItemContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
}));
