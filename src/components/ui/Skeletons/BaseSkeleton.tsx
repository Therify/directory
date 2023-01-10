import { Skeleton as MuiSkeleteon } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Skeleton = styled(MuiSkeleteon, {
    shouldForwardProp: (prop) => prop !== 'noMargin',
})<{ noMargin?: boolean }>(({ theme, width = '100%', noMargin }) => ({
    width,
    transform: 'none',
    borderRadius: theme.shape.borderRadius,
    ...(noMargin && {
        marginBottom: 0,
    }),
}));
