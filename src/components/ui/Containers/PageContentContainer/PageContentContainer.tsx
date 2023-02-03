import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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
})<{ fillContentSpace?: boolean }>(({ fillContentSpace }) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    ...(fillContentSpace ? fullWidthStyles : maxWidthStyles),
}));
