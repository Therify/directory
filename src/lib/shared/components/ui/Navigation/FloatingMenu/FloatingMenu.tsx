import { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Menu } from '@mui/material';
import { NavListItem } from '../NavigationMenu';
import { NavigationLink } from '@/lib/sitemap';
import { BUTTON_TYPE, IconButton } from '../../Button';

const TEST_IDS = {
    FLOATING_MENU: 'floating-menu',
    FLOATING_MENU_LINKS: 'floating-menu-links',
};

export const FloatingMenu = ({
    navigationMenu,
    currentPath,
    onNavigate,
    menuLauncher,
    ...props
}: {
    navigationMenu: NavigationLink[];
    currentPath: string;
    menuLauncher?: React.ReactNode;
    onNavigate: (path: string) => void;
    'data-testid'?: string;
}) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <Box
            data-testid={props['data-testid'] ?? TEST_IDS.FLOATING_MENU}
            sx={{
                justifyContent: 'flex-end',
                flexGrow: 1,
            }}
        >
            <IconButton
                type={BUTTON_TYPE.TEXT}
                color="info"
                aria-label="Navigation options"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
            >
                {menuLauncher ?? <MenuIcon />}
            </IconButton>
            <Menu
                data-testid={TEST_IDS.FLOATING_MENU_LINKS}
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                    '& .MuiList-root': { width: '275px' },
                }}
            >
                {navigationMenu.map((link) => (
                    <NavListItem
                        key={link.path}
                        link={link}
                        currentPath={currentPath}
                        onItemClicked={(path) => {
                            onNavigate(path);
                            setAnchorElNav(null);
                        }}
                    />
                ))}
            </Menu>
        </Box>
    );
};
