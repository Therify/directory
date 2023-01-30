import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ChevronLeftRounded as ChevronLeftRoundedIcon } from '@mui/icons-material';
import { NavigationLink } from '@/lib/sitemap';
import { ActionNavListItem, NavigationMenu } from '../NavigationMenu';
import { NavList } from '../NavigationMenu/NavigationMenu';
import { BUTTON_TYPE, IconButton } from '../../Button';

interface SideNavigationBarProps {
    navigationMenu: NavigationLink[];
    actionLink?: NavigationLink;
    notificationMap?: Record<string, number>;
    currentPath: string;
    onNavigate: (path: string) => void;
    children?: React.ReactNode;
}

const MENU_COLLAPSED_LOCALSTORAGE_KEY = 'therify-isSideBarCollapsed';

export const SideNavigationBar = ({
    currentPath,
    navigationMenu,
    actionLink,
    notificationMap,
    onNavigate,
    children,
}: SideNavigationBarProps) => {
    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        if (window) {
            setIsCollapsed(
                window?.localStorage.getItem(
                    MENU_COLLAPSED_LOCALSTORAGE_KEY
                ) !== 'false'
            );
        }
    }, []);
    useEffect(() => {
        if (window) {
            window.localStorage.setItem(
                MENU_COLLAPSED_LOCALSTORAGE_KEY,
                isCollapsed.toString()
            );
        }
    }, [isCollapsed]);

    return (
        <SideBar isCollapsed={isCollapsed}>
            <NavigationMenu
                hideText={isCollapsed}
                currentPath={currentPath}
                menu={navigationMenu}
                onItemClicked={onNavigate}
                notificationMap={notificationMap}
            />

            <Content>{children}</Content>
            {actionLink && (
                <NavList style={{ margin: theme.spacing(10, 0) }}>
                    <ActionNavListItem
                        link={actionLink}
                        hideText={isCollapsed}
                        onItemClicked={() => onNavigate(actionLink.path)}
                    />
                </NavList>
            )}
            <ToggleWrapper>
                <ToggleButton
                    isCollapsed={isCollapsed}
                    color="info"
                    type={BUTTON_TYPE.TEXT}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <ChevronLeftRoundedIcon />
                </ToggleButton>
            </ToggleWrapper>
        </SideBar>
    );
};

const SideBar = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed?: boolean }>(({ theme, isCollapsed }) => ({
    width: isCollapsed ? '80px' : '315px',
    height: '100%',
    display: 'none',
    transition: 'width 0.3s ease-in-out',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
}));

const Content = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
}));

const ToggleWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 4, 4),
}));

const ToggleButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed?: boolean }>(({ isCollapsed }) => ({
    transform: `rotate(${isCollapsed ? 180 : 0}deg)`,
    transition: 'transform 0.3s ease-in-out',
}));
