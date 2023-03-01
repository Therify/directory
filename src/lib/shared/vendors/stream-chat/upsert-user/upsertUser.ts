import { adaptUserIdentifier } from '../adapt-user-identifier';
import { StreamChatParams } from '../params';
import { Input, Output } from './schema';

interface UpsertUserParams extends StreamChatParams {}

export const factory = ({ streamChat }: UpsertUserParams) => {
    return async function upsertUser(input: Input): Promise<Output> {
        try {
            await streamChat.upsertUser({
                id: adaptUserIdentifier.makeStreamChatSafe(
                    input.userIdentifier
                ), // Stream Chat does not support the auth0| prefix
            });
            return {
                success: true,
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
            };
        }
    };
};
