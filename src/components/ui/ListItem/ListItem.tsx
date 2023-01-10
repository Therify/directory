import {
    Box,
    ListItem as MuiListItem,
    ListItemProps as MuiListItemProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import { CenteredContainer } from '../Layout';

interface ListItemProps {
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    onClick?: () => void;
}

export const ListItem = ({
    leftSlot,
    rightSlot,
    children,
    onClick,
}: PropsWithChildren<ListItemProps & MuiListItemProps>) => {
    const isClickable = Boolean(onClick);
    return (
        <Item onClick={() => onClick?.()}>
            <InnerItem isClickable={isClickable}>
                {leftSlot && <LeftSlot>{leftSlot}</LeftSlot>}
                <ContentWrapper>{children}</ContentWrapper>
                {rightSlot && <RightSlot>{rightSlot}</RightSlot>}
            </InnerItem>
        </Item>
    );
};

const ContentWrapper = styled(Box)(({ theme }) => ({
    flex: 1,
}));
const LeftSlot = styled(Box)(({ theme }) => ({
    paddingRight: theme.spacing(5),
}));
const RightSlot = styled(Box)(({ theme }) => ({
    paddingLeft: theme.spacing(5),
}));

const InnerItem = styled(CenteredContainer, {
    shouldForwardProp: (prop) => prop !== 'isClickable',
})<{ isClickable: boolean }>(({ theme, isClickable }) => ({
    width: '100%',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    transition: '0.2s ease-in-out',
    paddingLeft: theme.spacing(4),
    color: theme.palette.text.primary,
    flexDirection: 'row',
    padding: theme.spacing(5),
    ...(isClickable
        ? {
              cursor: 'pointer',
              '&:hover': {
                  backgroundColor: theme.palette.action.hover,
              },
          }
        : {}),
}));

const Item = styled(MuiListItem)(({ theme }) => ({
    padding: theme.spacing(2.5, 0),
    width: '100%',
}));
