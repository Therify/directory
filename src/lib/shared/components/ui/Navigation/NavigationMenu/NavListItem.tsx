import { NavigationLink } from '@/lib/sitemap';
import {
    ListItem,
    Avatar,
    ListItemText,
    Badge,
    ListItemProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getNavigationIcon } from '../utils';

export interface NavListItemProps {
    link: NavigationLink;
    currentPath: string;
    hideText?: boolean;
    onItemClicked: (path: string) => void;
    isActionItem?: boolean;
    notificationCount?: number;
}

export const NavListItem = ({
    link,
    currentPath,
    hideText,
    notificationCount,
    onItemClicked,
    ...listItemProps
}: NavListItemProps & ListItemProps) => {
    const Icon = getNavigationIcon(link.icon);
    return (
        <NavItem
            isSelected={currentPath === link.path}
            onClick={() => onItemClicked(link.path)}
            key={link.path}
            secondaryAction={
                (notificationCount ?? 0) > 0 && !hideText ? (
                    <NotificationCount>{notificationCount}</NotificationCount>
                ) : undefined
            }
            {...listItemProps}
        >
            {Icon && (
                <Badge
                    className="navigation-icon"
                    badgeContent={hideText ? notificationCount : undefined}
                    color="error"
                    max={9}
                >
                    <Icon data-testid={link.icon} />
                </Badge>
            )}
            {!hideText && <Text primary={link.displayName} />}
        </NavItem>
    );
};

const Text = styled(ListItemText)(() => ({
    '& span': {
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'block',
    },
}));

const NotificationCount = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: '.75rem',
    height: theme.spacing(6),
    width: theme.spacing(6),
}));

const NavItem = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    cursor: 'pointer',
    height: '60px',
    borderRadius: theme.shape.borderRadius,
    transition: '0.2s ease-in-out',
    paddingLeft: theme.spacing(4),
    color: isSelected
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
    '& .navigation-icon': {
        color: isSelected
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
        '& + .MuiListItemText-root': {
            paddingLeft: theme.spacing(7),
        },
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));
