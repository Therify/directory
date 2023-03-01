import { adaptUserIdentifier } from '../adapt-user-identifier';
import { StreamChatParams } from '../params';
import { Input, Output } from './schema';

interface CreateTokenParams extends StreamChatParams {}

export const factory = ({ streamChat }: CreateTokenParams) => {
    return function createToken(input: Input): Output {
        const accessToken = streamChat.createToken(
            adaptUserIdentifier.makeStreamChatSafe(input.userIdentifier) // Stream Chat does not support the auth0| prefix;
        );
        return { accessToken };
    };
};
