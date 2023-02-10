import { styled } from '@mui/material/styles';
import {
    MuiH1,
    MuiH2,
    MuiH3,
    MuiH4,
    MuiH5,
    MuiH6,
} from '../utils/MuiTypography';

export const H1 = styled(MuiH1)(({ theme }) => ({
    ...theme.typography.h1,
}));
export const H2 = styled(MuiH2)(({ theme }) => ({
    ...theme.typography.h2,
}));
export const H3 = styled(MuiH3)(({ theme }) => ({
    ...theme.typography.h3,
}));
export const H4 = styled(MuiH4)(({ theme }) => ({
    ...theme.typography.h4,
}));
export const H5 = styled(MuiH5)(({ theme }) => ({
    ...theme.typography.h5,
}));
export const H6 = styled(MuiH6)(({ theme }) => ({
    ...theme.typography.h6,
}));
