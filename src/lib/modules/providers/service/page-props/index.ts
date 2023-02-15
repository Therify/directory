import { AccountsService } from '@/lib/modules/accounts/service';
import { ProvidersServiceParams } from '../params';
import { GetPracticeProfilesPageProps } from './get-practice-profiles-page-props';
import { GetPracticeClientsPageProps } from './get-practice-clients-page-props';

export const pagePropsFactory = (params: ProvidersServiceParams) => ({
    getPracticeProfilesPageProps: GetPracticeProfilesPageProps.factory({
        ...params,
        accountsService: AccountsService,
    }),
    getPracticeClientsPageProps: GetPracticeClientsPageProps.factory({
        ...params,
        accountsService: AccountsService,
    }),
});
