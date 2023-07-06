import { SendNewMessageEmail } from '../../../features/email';
import { EmailNotificationsFactoryParams } from '../factoryParams';

export const sendNewMessageEmailFactory =
    ({ knock }: EmailNotificationsFactoryParams) =>
    async ({
        recipients,
        sender,
        messageUrl,
    }: SendNewMessageEmail.Input): Promise<SendNewMessageEmail.Output> => {
        const { workflowRunId } = await knock.sendUnreadChatMessagesEmail({
            recipients,
            actor: sender,
            messageUrl,
        });
        return { workflowRunId };
    };
