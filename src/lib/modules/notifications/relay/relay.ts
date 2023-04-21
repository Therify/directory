import { Emitter } from '@/lib/shared/emitter';
import * as Events from './events';
import { z } from 'zod';

const EVENTS = {
    [Events.Ping.EVENT_NAME]: Events.Ping.payloadSchema,
};

export type NotficationEvents = {
    [K in keyof typeof EVENTS]: z.infer<(typeof EVENTS)[K]>;
};

export const notificationsRelay = new Emitter<NotficationEvents>();

notificationsRelay.on(Events.Ping.EVENT_NAME, Events.Ping.handler);
