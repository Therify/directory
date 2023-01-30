import { IN_APP_NOTIFICATIONS_NODE_NAME } from './constants';
export const getUserNotificationsPath = (userId: number | string) => {
    return `${IN_APP_NOTIFICATIONS_NODE_NAME}/${userId}`;
};
