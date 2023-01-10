import { styled, Box } from '@mui/material';

const maxWidthStyles = {
    maxWidth: '1413px',
    minHeight: '100%',
    margin: '0 auto',
};

const fullWidthStyles = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
};

export const PageContentContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'fillContentSpace',
})<{ fillContentSpace?: boolean }>(({ theme, fillContentSpace }) => ({
    display: 'flex',
    flexGrow: 1,
    ...(fillContentSpace ? fullWidthStyles : maxWidthStyles),
}));
