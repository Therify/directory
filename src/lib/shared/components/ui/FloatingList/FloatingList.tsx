import { ReactNode, useState } from 'react';
import { MoreHoriz as LauncherIcon } from '@mui/icons-material';
import {
    Badge,
    Box,
    ListItemProps,
    ListItemText,
    Menu,
    ListItem as MuiListItem,
    SxProps,
    Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BUTTON_TYPE, IconButton } from '../Button';

interface FloatingListItemProps {
    icon?: ReactNode;
    text: string;
    onClick?: () => void;
}
interface FloatingListProps {
    listItems: FloatingListItemProps[];
    launcherIcon?: React.ReactNode;
    headerSlot?: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const FloatingList = ({
    launcherIcon,
    listItems,
    headerSlot,
    sx,
}: FloatingListProps) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <Box
            sx={{
                justifyContent: 'flex-end',
                ...sx,
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
                {launcherIcon ?? <LauncherIcon />}
            </IconButton>
            <Menu
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
                {headerSlot && (
                    <ListItem hoverable={false}>{headerSlot}</ListItem>
                )}
                {listItems.map(({ icon, onClick, text }, i) => (
                    <ListItem
                        key={i}
                        onClick={() => {
                            onClick?.();
                            setAnchorElNav(null);
                        }}
                    >
                        {icon && (
                            <Badge className="navigation-icon">{icon}</Badge>
                        )}
                        <Text primary={text} />
                    </ListItem>
                ))}
            </Menu>
        </Box>
    );
};

export interface NavListItemProps {
    onItemClicked: (path: string) => void;
    icon?: React.ReactNode;
}

const Text = styled(ListItemText)(() => ({
    '& span': {
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'block',
    },
}));

const ListItem = styled(MuiListItem, {
    shouldForwardProp: (prop) => prop !== 'hoverable',
})<{ hoverable?: boolean }>(({ theme, hoverable = true }) => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    cursor: 'pointer',
    height: '60px',
    borderRadius: theme.shape.borderRadius,
    transition: '0.2s ease-in-out',
    paddingLeft: theme.spacing(4),
    color: theme.palette.text.primary,
    '& .navigation-icon + .MuiListItemText-root': {
        paddingLeft: theme.spacing(7),
    },
    ...(hoverable
        ? {
              '&:hover': {
                  backgroundColor: theme.palette.action.hover,
              },
          }
        : {}),
}));
