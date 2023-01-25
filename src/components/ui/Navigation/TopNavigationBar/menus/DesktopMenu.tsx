import { TherifyUser } from '@/lib/hooks';
import { NavigationLink } from '@/lib/sitemap';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { isActivePath } from '../../utils';

interface DestopMenuProps {
    currentPath: string;
    navigationLinks: NavigationLink[];
    handleCloseNavMenu: () => void;
    user: TherifyUser;
}

export const DesktopMenu = ({
    navigationLinks,
    currentPath,
    handleCloseNavMenu,
    user,
}: DestopMenuProps) => {
    return (
        <Box
            data-testid="desktop-menu"
            sx={{
                justifyContent: 'flex-end',
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
            }}
        >
            {navigationLinks.map(({ path, displayName }) => (
                <Button
                    key={path}
                    onClick={handleCloseNavMenu}
                    sx={{
                        my: 2,
                        lineHeight: '1.2rem',
                        color: 'black',
                        display: 'block',
                    }}
                >
                    <Link href={path} passHref>
                        <a
                            style={{
                                textUnderlineOffset: '4px',
                                textDecoration: isActivePath(path, currentPath)
                                    ? 'underline'
                                    : 'none',
                            }}
                        >
                            {displayName}
                        </a>
                    </Link>
                </Button>
            ))}
            {user && (
                <Link href="/api/auth/logout" passHref>
                    Logout
                </Link>
            )}
        </Box>
    );
};
