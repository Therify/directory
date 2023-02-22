import { StreamChatParams } from '../params';
import { Input, Output } from './schema';

interface CreateTokenParams extends StreamChatParams {}

export const factory = async ({ streamChat }: CreateTokenParams) => {
    return function createToken(input: Input): Output {
        const accessToken = streamChat.createToken(input.userIdentifier);
        return { accessToken };
    };
};
