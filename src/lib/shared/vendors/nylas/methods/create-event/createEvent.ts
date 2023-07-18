import Event from 'nylas/lib/models/event';
import EventParticipants from 'nylas/lib/models/event-participant';
import { FactoryParams } from '../factoryParams';
import { Input, Output } from './schema';

export const factory =
    ({ nylas }: FactoryParams) =>
    async ({
        accessToken,
        calendarId,
        title,
        description,
        startTimestamp,
        endTimestamp,
        participants,
    }: Input): Promise<Output> => {
        const nylasConnection = nylas.with(accessToken);

        const event = new Event(nylasConnection);

        event.calendarId = calendarId;
        event.title = title;
        event.description = description;
        event.when.startTime = startTimestamp;
        event.when.endTime = endTimestamp;
        event.participants = participants.map((p) => new EventParticipants(p));
        const result = await event.save();
        if (!result.id) throw new Error('No event id on the result');

        return { eventId: result.id };
    };
