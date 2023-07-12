import Nylas from 'nylas';
import { withNylasConfiguration } from './configuration';
import {
    GetEventsByCalendar,
    GetCalendars,
    CreateEvent,
    FactoryParams,
    GetAccessToken,
} from './methods';

let hasBeenInitialized = false;

async function withNylas<Result>(factoryFn: (params: FactoryParams) => Result) {
    if (!hasBeenInitialized) {
        console.log('Initializing Nylas');
        const details = await withNylasConfiguration((CONFIG) => {
            Nylas.config({
                clientId: CONFIG.NYLAS_CLIENT_ID,
                clientSecret: CONFIG.NYLAS_CLIENT_SECRET,
                apiServer: CONFIG.NYLAS_API_SERVER,
            });
            return Nylas.application({
                redirectUris: [CONFIG.APPLICATION_URL],
            });
        });
        hasBeenInitialized = true;
        console.log(details);
    } else {
        console.log('Nylas already initialized');
    }
    return factoryFn({ nylas: Nylas });
}

export const vendorNylas = {
    getAccessToken: withNylas(GetAccessToken.factory),
    createEvent: withNylas(CreateEvent.factory),
    getEventsByCalendar: withNylas(GetEventsByCalendar.factory),
    getCalendars: withNylas(GetCalendars.factory),
};

export type VendorNylas = typeof vendorNylas;
