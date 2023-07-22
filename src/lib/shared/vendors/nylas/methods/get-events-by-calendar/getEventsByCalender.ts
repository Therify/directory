import { Event } from '../../schema';
import { FactoryParams } from '../factoryParams';
import { Input, Output } from './schema';

export const factory =
    ({ nylas }: FactoryParams) =>
    async ({
        accessToken,
        calendarId,
        startsAfter,
        endsBefore,
        limit,
    }: Input): Promise<Output> => {
        const events = await nylas.with(accessToken).events.list({
            calendar_id: calendarId,
            starts_after: startsAfter
                ? new Date(startsAfter).getTime() / 1000
                : new Date().getTime() / 1000,
            ...(endsBefore && {
                ends_before: new Date(endsBefore).getTime() / 1000,
            }),
            limit,
        });
        return { events: Event.schema.array().parse(events) };
    };
