import { ProvidersServiceParams } from '../params';
import { CreateProviceProfileForPractice } from './create-provider-profile-for-practice';
import { ListPracticeProfilesByUserId } from './list-practice-profiles-by-user-id';

export const profilesFactory = (params: ProvidersServiceParams) => ({
    createProfileForPractice: CreateProviceProfileForPractice.factory(params),
    listPracticeProfilesByUserId: ListPracticeProfilesByUserId.factory(params),
    getProfileById: () => {},
});
