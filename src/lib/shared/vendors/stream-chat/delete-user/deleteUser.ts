import { adaptUserIdentifier } from '../adapt-user-identifier';
import { StreamChatParams } from '../params';
import { Input, Output } from './schema';

interface DeleteUserParams extends StreamChatParams {}

export const factory = ({ streamChat }: DeleteUserParams) => {
    return async function deleteUser({
        userIdentifier,
        markMessagesAsDeleted,
    }: Input): Promise<Output> {
        try {
            const streamChatUserId =
                adaptUserIdentifier.makeStreamChatSafe(userIdentifier);
            await streamChat.deleteUser(streamChatUserId, {
                mark_messages_deleted: markMessagesAsDeleted,
            });
            return {
                success: true,
                userIdentifier,
            };
        } catch (error) {
            return {
                success: false,
                userIdentifier,
            };
        }
    };
};
