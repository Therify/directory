import { CloseRounded as CloseIcon } from '@mui/icons-material';
import { Box, Drawer as MuiDrawer, List, ListItem } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { IconButton, BUTTON_TYPE, TherifyLogo } from '@/components/ui';
import { MARKETING_SITE_MENU } from '@/lib/sitemap';

interface MarketingSiteDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const MarketingSiteDrawer = ({
    isOpen,
    onClose,
    children,
}: MarketingSiteDrawerProps) => {
    const theme = useTheme();
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <MenuHeader>
                <CloseButton type={BUTTON_TYPE.TEXT} onClick={onClose}>
                    <CloseIcon fontSize="large" />
                </CloseButton>
                <TherifyLogo style={{ height: '52px' }} />
            </MenuHeader>
            <List>
                {MARKETING_SITE_MENU.map((link) => (
                    <ListItem key={link.path}>
                        <Link href={link.path}>{link.displayName}</Link>
                    </ListItem>
                ))}
            </List>
            <BottomContentContainer>{children}</BottomContentContainer>
        </Drawer>
    );
};

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '312px',
        height: '100%',
        overflow: 'hidden',
    },
}));

const MenuHeader = styled(Box)(({ theme }) => ({
    margin: theme.spacing(12.5, 4, 0),
    paddingBottom: theme.spacing(6),
    position: 'relative',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(6),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
}));

const BottomContentContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(4),
}));

const Link = styled('a')(({ theme }) => ({
    ...theme.typography.h3,
    fontSize: '1.75rem',
    color: theme.palette.text.primary,
    textDecoration: 'none',
}));
