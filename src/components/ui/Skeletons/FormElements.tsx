import { styled } from '@mui/material/styles';
import { Skeleton } from './BaseSkeleton';

export const InputSkeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.fontSize,
    padding: theme.spacing(3, 0),
    boxSizing: 'content-box',
    marginBottom: noMargin ? 0 : theme.spacing(4),
}));

export const LabelSkeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.fontSize * 0.875,
    marginBottom: noMargin ? 0 : theme.spacing(4),
    width: '25%',
}));
