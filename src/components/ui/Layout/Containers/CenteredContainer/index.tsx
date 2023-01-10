import { Box, BoxProps } from '@mui/material';
export const CenteredContainer = ({
    fillSpace,
    children,
    ...props
}: BoxProps & { fillSpace?: boolean }) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            {...(fillSpace ? { width: '100%', height: '100%', flex: 1 } : {})}
            {...props}
        >
            {children}
        </Box>
    );
};
