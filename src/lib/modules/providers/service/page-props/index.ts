import { ProvidersServiceParams } from '../params';
import { GetBillingPageProps } from './get-billing-page-props';
import { GetPracticeClientsPageProps } from './get-practice-clients-page-props';
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
    getPracticeClientsPageProps: GetPracticeClientsPageProps.factory({
        ...params,
    }),
    getBillingPageProps: GetBillingPageProps.factory(params),
});
