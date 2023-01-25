import { TherifyUser } from '@/lib/hooks';
import { NavigationLink } from '@/lib/sitemap';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';

interface MobileMenuProps {
    handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
    anchorElNav: HTMLElement | null;
    handleCloseNavMenu: () => void;
    navigationLinks: NavigationLink[];
    user?: TherifyUser;
}

export const MobileMenu = ({
    handleOpenNavMenu,
    anchorElNav,
    handleCloseNavMenu,
    navigationLinks,
    user,
}: MobileMenuProps) => {
    return (
        <Box
            data-testid="mobile-menu"
            sx={{
                justifyContent: 'flex-end',
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
            }}
        >
            <IconButton
                size="large"
                aria-label="Navigation options"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="default"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                data-testid="mobile-menu-links"
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
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                {navigationLinks.map((link) => (
                    <MenuItem key={link.path} onClick={handleCloseNavMenu}>
                        <Link href={link.path} passHref>
                            {link.displayName}
                        </Link>
                    </MenuItem>
                ))}
                {user && (
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Link href="/api/auth/logout" passHref>
                            Logout
                        </Link>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};
