import { Knock } from '@knocklabs/node';
import { Input, Output } from './schema';
const NEW_MESSAGE_EMAIL_WORKFLOW_ID = 'new-message-email' as const;

export const factory =
    ({ knock }: { knock: Knock }) =>
    async ({ recipients, messageUrl, actor }: Input): Promise<Output> => {
        const { workflow_run_id: workflowRunId } =
            await knock.workflows.trigger(NEW_MESSAGE_EMAIL_WORKFLOW_ID, {
                data: { messageUrl },
                actor,
                recipients,
            });
        return { workflowRunId };
    };
