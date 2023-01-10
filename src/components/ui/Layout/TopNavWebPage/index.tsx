import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface TopNavWebPageProps {
    navigationSlot: React.ReactNode;
}
export const TopNavWebPage = ({
    navigationSlot,
    children,
}: PropsWithChildren<TopNavWebPageProps>) => {
    return (
        <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            overflow="none"
        >
            {navigationSlot}
            <Box flexGrow={1} overflow="hidden">
                {children}
            </Box>
        </Box>
    );
};
