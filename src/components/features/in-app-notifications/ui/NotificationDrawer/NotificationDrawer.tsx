import { Box, Drawer as MuiDrawer, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Notification } from '@/lib/types';
import { CloseRounded as CloseRoundedIcon } from '@mui/icons-material';
import {
    IconButton,
    BUTTON_TYPE,
    Button,
    List,
    ListItem,
    CenteredContainer,
    Divider,
    Avatar,
    H6,
    Caption,
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/components/ui';

interface NotificationDrawerProps {
    notifications: Notification.InApp.PersitedType[];
    onNotificationClicked: (
        notification: Notification.InApp.PersitedType
    ) => void;
    isOpen: boolean;
    onClose: () => void;
    onClearNotifications?: () => void;
}

export const NotificationDrawer = ({
    isOpen,
    notifications,
    onClose,
    onNotificationClicked,
    onClearNotifications,
}: NotificationDrawerProps) => {
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Drawer
            hideBackdrop={isMobileWidth}
            anchor={isMobileWidth ? 'top' : 'right'}
            open={isOpen}
            onClose={onClose}
        >
            <CenteredContainer
                padding={theme.spacing(10, 4, 9, 4)}
                flexDirection="row"
                justifyContent="space-between"
            >
                <H6>Notifications</H6>
                <IconButton
                    color="info"
                    type={BUTTON_TYPE.TEXT}
                    onClick={onClose}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </CenteredContainer>
            <Divider style={{ margin: 0 }} />
            <List style={{ flex: 1 }}>
                {notifications.map((notification, index) => (
                    <ListItem
                        key={notification.id}
                        onClick={() => onNotificationClicked(notification)}
                        leftSlot={<Beacon isViewed={notification.isViewed} />}
                        rightSlot={
                            notification.imageUrl ? (
                                <Avatar
                                    src={notification.imageUrl}
                                    alt={`Notification ${index} image`}
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        margin: 0,
                                    }}
                                />
                            ) : null
                        }
                    >
                        <Paragraph
                            size={PARAGRAPH_SIZE.SMALL}
                            bold={!notification.isViewed}
                            noMargin
                        >
                            {notification.title}
                        </Paragraph>
                        {notification.body && (
                            <Caption
                                style={{ color: theme.palette.text.secondary }}
                            >
                                {notification.body}
                            </Caption>
                        )}
                    </ListItem>
                ))}
                {notifications.length === 0 && (
                    <ListItem>
                        <Paragraph size={PARAGRAPH_SIZE.SMALL}>
                            All caught up!{' '}
                            <span role="img" aria-label="party emoji">
                                🎉
                            </span>
                        </Paragraph>
                    </ListItem>
                )}
            </List>
            {onClearNotifications &&
                notifications.filter(({ isViewed }) => !isViewed).length >
                    0 && (
                    <Box paddingX={4.5} paddingTop={4} paddingBottom={16}>
                        <Button fullWidth onClick={onClearNotifications}>
                            Clear all notifications
                        </Button>
                    </Box>
                )}
        </Drawer>
    );
};
const Beacon = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isViewed',
})<{ isViewed: boolean }>(({ theme, isViewed }) => ({
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: '50%',
    backgroundColor: isViewed ? 'transparent' : theme.palette.error.main,
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 0,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('md')]: {
            width: '390px',
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: 0,
        },
    },
}));
