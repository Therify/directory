import Nylas from 'nylas';
import { withNylasConfiguration } from './configuration';
import {
    GetEventsByCalendar,
    GetCalendars,
    CreateEvent,
    FactoryParams,
    ExchangeCodeForAccessToken,
    GenerateAuthUrl,
} from './methods';
import { URL_PATHS } from '@/lib/sitemap';

withNylasConfiguration((CONFIG) => {
    const AUTH_SUCCESS_CALLBACK_URL =
        CONFIG.APPLICATION_URL +
        URL_PATHS.PROVIDERS.COACH.SCHEDULING.AUTH_SUCCESS;
    Nylas.config({
        clientId: CONFIG.NYLAS_CLIENT_ID,
        clientSecret: CONFIG.NYLAS_CLIENT_SECRET,
        apiServer: CONFIG.NYLAS_API_SERVER,
    });
    return Nylas.application({
        redirectUris: [AUTH_SUCCESS_CALLBACK_URL],
    });
});
const params: FactoryParams = {
    nylas: Nylas,
};

export const vendorNylas = {
    exchangeCodeForAccessToken: ExchangeCodeForAccessToken.factory(params),
    generateAuthUrl: GenerateAuthUrl.factory(params),
    createEvent: CreateEvent.factory(params),
    getEventsByCalendar: GetEventsByCalendar.factory(params),
    getCalendars: GetCalendars.factory(params),
};

export type VendorNylas = typeof vendorNylas;
