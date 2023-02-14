import { AccountsService } from '@/lib/modules/accounts/service';
import { ProvidersServiceParams } from '../params';
import { GetPracticeProfilesPageProps } from './get-practice-profiles-page-props';
import { GetProviderInvitationRegistrationPageProps } from './get-provider-invitation-registration-page-props';

export const pagePropsFactory = (params: ProvidersServiceParams) => ({
    getPracticeProfilesPageProps: GetPracticeProfilesPageProps.factory({
        ...params,
        accountsService: AccountsService,
    }),
    getProviderInvitationRegistrationPageProps:
        GetProviderInvitationRegistrationPageProps.factory(params),
});
