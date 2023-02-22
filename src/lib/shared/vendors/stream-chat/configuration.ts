import { get } from 'env-var';

import { generateWithConfig } from '@/lib/shared/utils';

export const STREAM_CHAT_API_KEY = 'STREAM_CHAT_API_KEY' as const;
export const STREAM_CHAT_SECRET_KEY = 'STREAM_CHAT_SECRET_KEY' as const;

interface StreamChatConfiguration {
    STREAM_CHAT_API_KEY: string;
    STREAM_CHAT_SECRET_KEY: string;
}

export function getStreamChatConfiguration(
    overrides: Partial<StreamChatConfiguration> = {}
): StreamChatConfiguration {
    return {
        [STREAM_CHAT_API_KEY]: get(STREAM_CHAT_API_KEY).required().asString(),
        [STREAM_CHAT_SECRET_KEY]: get(STREAM_CHAT_SECRET_KEY)
            .required()
            .asString(),
        ...overrides,
    };
}

export const withStreamChatConfiguration = generateWithConfig(
    getStreamChatConfiguration
);
