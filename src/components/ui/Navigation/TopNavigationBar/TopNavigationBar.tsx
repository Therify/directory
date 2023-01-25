import { GetUserDetailsByAuth0Id } from '@/lib/features/users';
import { TherifyUser } from '@/lib/hooks';
import { NavigationLink } from '@/lib/sitemap';
import { Box, Container, Toolbar } from '@mui/material';
import { useState } from 'react';
import { TherifyLogo } from '../../Logo';
import { DesktopMenu, MobileMenu } from './menus';

GetUserDetailsByAuth0Id.outputSchema.shape.details.parse;

export interface TopNavigationBarProps {
    navigationLinks: NavigationLink[];
    currentPath: string;
    user: TherifyUser;
}
export const TopNavigationBar = ({
    currentPath,
    navigationLinks,
    user,
}: TopNavigationBarProps) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TherifyLogo />
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexGrow: 1,
                        }}
                    >
                        <MobileMenu
                            navigationLinks={navigationLinks}
                            handleCloseNavMenu={handleCloseNavMenu}
                            handleOpenNavMenu={handleOpenNavMenu}
                            anchorElNav={anchorElNav}
                            user={user}
                        />
                        <DesktopMenu
                            user={user}
                            currentPath={currentPath}
                            navigationLinks={navigationLinks}
                            handleCloseNavMenu={handleCloseNavMenu}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </Box>
    );
};
