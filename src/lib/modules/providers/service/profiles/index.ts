import { ProvidersServiceParams } from '../params';
import { CreateProviceProfileForPractice } from './create-provider-profile-for-practice';

export const profilesFactory = (params: ProvidersServiceParams) => ({
    createProfileForPractice: CreateProviceProfileForPractice.factory(params),
    listProfilesForPractice: () => {},
    getFullProfileById: () => {},
});
