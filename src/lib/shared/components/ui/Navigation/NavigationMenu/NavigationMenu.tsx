import { NavigationLink } from '@/lib/sitemap';
import { List } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavListItem } from './NavListItem';

export interface NavigationMenuProps {
    menu: NavigationLink[];
    notificationMap?: Record<string, number>;
    currentPath: string;
    hideText?: boolean;
    withActiveTab?: boolean;
    onItemClicked: (path: string) => void;
}

export const TEST_IDS = {
    TAB: 'navigation-menu-tab',
} as const;

export const NavigationMenu = ({
    menu,
    currentPath,
    hideText,
    withActiveTab = true,
    onItemClicked,
    notificationMap,
}: NavigationMenuProps) => {
    const activeIndex = menu.findIndex(({ path }) => {
        if (currentPath === '/') {
            return currentPath === path;
        }
        return path !== '/' && currentPath.startsWith(path);
    });
    const isCurrentPathInMenu = activeIndex !== -1;
    return (
        <NavList>
            {menu.map((link) => (
                <NavListItem
                    key={link.path}
                    link={link}
                    hideText={hideText}
                    currentPath={currentPath}
                    notificationCount={notificationMap?.[link.path]}
                    onItemClicked={onItemClicked}
                />
            ))}
            {withActiveTab && isCurrentPathInMenu && (
                <Tab data-testid={TEST_IDS.TAB} offset={activeIndex} />
            )}
        </NavList>
    );
};
const Tab = styled('span', {
    shouldForwardProp: (prop) => prop !== 'top',
})<{ offset: number }>(({ theme, offset }) => {
    const paddingTopOffset = 8;
    const liHeightOffset = 60;
    return {
        position: 'absolute',
        display: 'block',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '2px',
        top: 0,
        left: 0,
        width: '4px',
        height: '60px',
        transform: `translateY(${
            offset * liHeightOffset + paddingTopOffset
        }px)`,
        transition: '0.2s ease-in-out',
    };
});

export const NavList = styled(List)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(2, 3),
    width: '100%',
}));
