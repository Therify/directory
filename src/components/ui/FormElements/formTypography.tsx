import { styled } from '@mui/material/styles';
import { H1, H2, H3 } from '../Typography';

export const FormHeader = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    width: '75%',
}));

export const FormSectionTitle = styled(H2)(({ theme }) => ({
    ...theme.typography.h4,
    marginTop: theme.spacing(8),
}));
export const FormSectionSubtitle = styled(H3)(({ theme }) => ({
    ...theme.typography.body2,
}));
