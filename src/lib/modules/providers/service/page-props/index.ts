import { AccountsService } from '@/lib/modules/accounts/service';
import { ProvidersServiceParams } from '../params';
import { GetPracticeProfilesPageProps } from './get-practice-profiles-page-props';
import { GetTherifyUserPageProps } from './get-therify-user-props';

export const pagePropsFactory = (params: ProvidersServiceParams) => ({
    getTherifyUserPageProps: GetTherifyUserPageProps.factory(params),
    getPracticeProfilesPageProps: GetPracticeProfilesPageProps.factory({
        ...params,
        accountsService: AccountsService,
    }),
});
