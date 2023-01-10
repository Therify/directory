import React, { PropsWithChildren } from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SideNavigationLayoutProps {
    topbar: React.ReactNode;
    navigation: React.ReactNode;
}
export const SideNavigationLayout = ({
    topbar,
    navigation,
    children,
}: PropsWithChildren<SideNavigationLayoutProps>) => {
    return (
        <Page>
            {topbar}
            <ContentContainer>
                <SideBarContainer component="nav">
                    {navigation}
                </SideBarContainer>
                <PageContents component="main">{children}</PageContents>
            </ContentContainer>
        </Page>
    );
};
const Page = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
}));

const ContentContainer = styled(Box)(() => ({
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
}));

const PageContents = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    overflow: 'auto',
    height: '100%',
}));

const SideBarContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
}));
