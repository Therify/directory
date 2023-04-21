import { z } from 'zod';
export const EVENT_NAME = 'ping' as const;

export const payloadSchema = z.object({
    message: z.string(),
    timestamp: z.number(),
});

export type Payload = z.infer<typeof payloadSchema>;

interface PingHandlerFactoryParams {
    logger: Console;
}

export function handlerFactory({ logger }: PingHandlerFactoryParams) {
    return (payload: Payload) => {
        logger.log('Ping event received:', payload);
    };
}

export const handler = handlerFactory({ logger: console });
