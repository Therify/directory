import { CloseRounded as CloseIcon } from '@mui/icons-material';
import { Box, Drawer as MuiDrawer } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
    H5,
    Avatar,
    AVATAR_SIZE,
    IconButton,
    BUTTON_TYPE,
} from '@/components/ui';
import { NavigationLink } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/types/therify-user';
import { NavigationMenu } from '../NavigationMenu';

interface NavigationDrawerProps {
    currentPath: string;
    user?: TherifyUser.TherifyUser;
    navigationMenu: NavigationLink[];
    notificationsMap: Record<string, number>;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (path: string) => void;
    children?: React.ReactNode;
}

export const NavigationDrawer = ({
    user,
    isOpen,
    navigationMenu,
    notificationsMap,
    currentPath,
    onClose,
    onNavigate,
    children,
}: NavigationDrawerProps) => {
    const theme = useTheme();
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <MenuHeader>
                <CloseButton type={BUTTON_TYPE.TEXT} onClick={onClose}>
                    <CloseIcon fontSize="large" />
                </CloseButton>
                <Avatar
                    size={AVATAR_SIZE.XLARGE}
                    src={user?.avatarUrl}
                    sx={{ marginBottom: 4 }}
                />
                {/* TODO: Get Name */}
                <H5 style={{ marginBottom: 2 }}>{user?.emailAddress}</H5>
            </MenuHeader>
            <NavigationMenu
                menu={navigationMenu}
                currentPath={currentPath}
                onItemClicked={onNavigate}
                withActiveTab={false}
                notificationMap={notificationsMap}
            />
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
