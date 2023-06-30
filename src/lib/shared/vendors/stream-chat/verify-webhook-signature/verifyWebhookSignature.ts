import { StreamChatParams } from '../params';
import { Input } from './schema';

interface VerifyWebhookSignatureParams extends StreamChatParams {}

export const factory = ({ streamChat }: VerifyWebhookSignatureParams) => {
    return function upsertUser({ requestBody, signature }: Input): boolean {
        try {
            return streamChat.verifyWebhook(requestBody, signature);
        } catch (error) {
            console.error(error);
            return false;
        }
    };
};
