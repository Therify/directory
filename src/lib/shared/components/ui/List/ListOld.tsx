import { Theme, useTheme } from '@mui/material/styles';
import { CSSProperties, PropsWithChildren } from 'react';

interface ListProps {
    // items: ReactNode[];
    withListBorder?: boolean;
    withItemSeparator?: boolean;
    style?: CSSProperties;
    listItemStyle?: CSSProperties;
}
export const TEST_IDS = {
    LIST: 'list',
};

export const List = ({
    withListBorder,
    style,
    withItemSeparator = true,
    listItemStyle,
    children,
}: PropsWithChildren<ListProps>) => {
    const theme = useTheme();
    return (
        <Ul withBorder={withListBorder} theme={theme} style={style}>
            {children}
        </Ul>
    );
};

const Ul = ({
    withBorder,
    style,
    theme,
    children,
}: PropsWithChildren<{
    withBorder?: boolean;
    style?: CSSProperties;
    theme: Theme;
}>) => (
    <ul
        data-testid={TEST_IDS.LIST}
        style={{
            overflow: 'none',
            overflowY: 'auto',
            borderRadius: theme.shape.borderRadius,
            border: withBorder ? `1px solid ${theme.palette.divider}` : 'none',
            listStyleType: 'none',
            padding: theme.spacing(0, 9),
            ...style,
        }}
    >
        {children}
    </ul>
);

const Item = ({
    isLastItem,
    withBorder,
    theme,
    children,
    style,
}: PropsWithChildren<{
    withBorder?: boolean;
    isLastItem: boolean;
    theme: Theme;
    style?: CSSProperties;
}>) => (
    <li
        style={{
            padding: theme.spacing(7, 0),
            border: 'none',
            borderBottom:
                withBorder && !isLastItem
                    ? `1px solid ${theme.palette.divider}`
                    : 'none',
            ...style,
        }}
    >
        {children}
    </li>
);
