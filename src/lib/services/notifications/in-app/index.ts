import { InAppNotificationsFactoryParams } from './factoryParams';
import { createInAppNotificationFactory } from './create';
import { getByUserIdFactory } from './get-by-user-id';

export const inAppNotificationFactory = (
    params: InAppNotificationsFactoryParams
) => ({
    create: createInAppNotificationFactory(params),
    getByUserId: getByUserIdFactory(params),
});
