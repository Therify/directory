import { Knock, Recipient } from '@knocklabs/node';
import { Input, Output } from './schema';
const CHAT_NOTIFICATION_EMAIL_WORKFLOW_ID = 'chat-notifications' as const;

export const factory =
    ({ knock }: { knock: Knock }) =>
    async ({ recipients, data, actor }: Input): Promise<Output> => {
        const { workflow_run_id: workflowRunId } =
            await knock.workflows.trigger(CHAT_NOTIFICATION_EMAIL_WORKFLOW_ID, {
                data,
                actor,
                recipients,
            });
        return { workflowRunId };
    };
