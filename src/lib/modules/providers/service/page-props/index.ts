import { ProvidersServiceParams } from '../params';
import { GetProviderRegisterWithInvitationPageProps } from './get-provider-register-with-invitation-page-props';
import { GetTherifyUserPageProps } from './get-therify-user-props';
import { practicePagesFactory } from './practice';

export const pagePropsFactory = (params: ProvidersServiceParams) => ({
    getTherifyUserPageProps: GetTherifyUserPageProps.factory(params),
    practice: practicePagesFactory(params),
    register: {
        withInvitationPageProps:
            GetProviderRegisterWithInvitationPageProps.factory(params),
    },
});
