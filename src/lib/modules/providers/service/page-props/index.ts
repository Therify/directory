import { ProvidersServiceParams } from '../params';
import { GetBillingPageProps } from './get-billing-page-props';
import { GetChatPageProps } from './get-chat-page-props';
import { GetClientDetailsPageProps } from './get-client-details-page-props';
import { GetProviderClientsPageProps } from './get-clients-page-props';
import { GetPracticeClientsPageProps } from './get-practice-clients-page-props';
import { GetProviderProfileEditorPageProps } from './get-provider-profile-editor-page-props';
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
    getPracticeClientsPageProps: GetPracticeClientsPageProps.factory(params),
    getProviderClientsPageProps: GetProviderClientsPageProps.factory(params),
    getBillingPageProps: GetBillingPageProps.factory(params),
    getProviderProfileEditorPageProps:
        GetProviderProfileEditorPageProps.factory(params),
    getChatPageProps: GetChatPageProps.factory(params),
    getClientDetailsPageProps: GetClientDetailsPageProps.factory(params),
});
