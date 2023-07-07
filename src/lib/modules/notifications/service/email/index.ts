import { EmailNotificationsFactoryParams } from './factoryParams';
import { sendNewMessageEmailFactory } from './send-new-message-email';

export const emailNotificationFactory = (
    params: EmailNotificationsFactoryParams
) => ({
    sendNewMessageEmail: sendNewMessageEmailFactory(params),
});
