import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface TopNavigationLayoutProps {
    bannerSlot?: React.ReactNode;
    navigationSlot: React.ReactNode;
}
export const TopNavigationLayout = ({
    bannerSlot,
    navigationSlot,
    children,
}: PropsWithChildren<TopNavigationLayoutProps>) => {
    return (
        <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            overflow="hidden"
        >
            {bannerSlot}
            {navigationSlot}
            <Box flexGrow={1} overflow="hidden">
                {children}
            </Box>
        </Box>
    );
};
