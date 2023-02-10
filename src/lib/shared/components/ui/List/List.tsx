import { List as MuiList, ListProps as MuiListProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TEST_IDS = {
    LIST: 'list',
} as const;

type ListProps = {
    withItemSeparator?: boolean;
} & MuiListProps;

export const List = ({ withItemSeparator, ...props }: ListProps) => {
    return (
        <ListWrapper
            data-testid={TEST_IDS.LIST}
            withItemSeparator={withItemSeparator ?? true}
            {...props}
        />
    );
};

const ListWrapper = styled(MuiList, {
    shouldForwardProp: (prop) => prop !== 'withItemSeparator',
})<{ withItemSeparator?: boolean }>(({ theme, withItemSeparator }) => ({
    ...(withItemSeparator
        ? {
              '& li': {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  '&:last-child': {
                      borderBottom: 'none',
                  },
              },
          }
        : {}),
}));
