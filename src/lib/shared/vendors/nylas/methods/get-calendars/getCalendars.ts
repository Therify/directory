import { Calendar } from '../../schema';
import { FactoryParams } from '../factoryParams';
import { Input, Output } from './schema';

export const factory =
    ({ nylas }: FactoryParams) =>
    async ({ accessToken }: Input): Promise<Output> => {
        const calendars = await nylas.with(accessToken).calendars.list();

        return { calendars: Calendar.schema.array().parse(calendars) };
    };
