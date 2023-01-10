import { styled } from '@mui/material/styles';
import { Skeleton } from './BaseSkeleton';
import { PARAGRAPH_SIZE, ParagraphSize } from '../Typography';

export const H1Skeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.h1.fontSize,
    marginBottom: noMargin ? 0 : theme.typography.h1.marginBottom,
}));
export const H2Skeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.h2.fontSize,
    marginBottom: noMargin ? 0 : theme.typography.h2.marginBottom,
}));
export const H3Skeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.h3.fontSize,
    marginBottom: noMargin ? 0 : theme.typography.h3.marginBottom,
}));
export const H4Skeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.h4.fontSize,
    marginBottom: noMargin ? 0 : theme.typography.h4.marginBottom,
}));
export const H5Skeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.h5.fontSize,
    marginBottom: noMargin ? 0 : theme.typography.h5.marginBottom,
}));
export const H6Skeleton = styled(Skeleton)(({ theme, noMargin }) => ({
    height: theme.typography.h6.fontSize,
    marginBottom: noMargin ? 0 : theme.typography.h6.marginBottom,
}));

export const ParagraphSkeleton = styled(Skeleton, {
    shouldForwardProp: (prop) => prop !== 'size',
})<{ size?: ParagraphSize }>(
    ({ theme, size = PARAGRAPH_SIZE.MEDIUM, noMargin }) => {
        const paragraphSize =
            PARAGRAPH_SIZE.MEDIUM === size
                ? 'body2'
                : PARAGRAPH_SIZE.SMALL === size
                ? 'body1'
                : 'body3';
        return {
            height: theme.typography[paragraphSize].fontSize,
            marginBottom: noMargin ? 0 : theme.spacing(4),
        };
    }
);
