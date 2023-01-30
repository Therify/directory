import { colors } from '@/components/themes/therify-design-system';
import { styled } from '@mui/material/styles';
import { NavListItem, NavListItemProps } from './NavListItem';

export const ActionNavListItem = styled(
    (props: Omit<NavListItemProps, 'currentPath'>) => (
        <NavListItem
            className="navigation-action-item"
            currentPath=""
            {...props}
        />
    )
)(() => ({
    color: colors.primary[700],
    background: colors.primary[50],
    '&:hover': {
        backgroundColor: colors.primary[200],
    },
}));
