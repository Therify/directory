import { ProvidersServiceParams } from '../params';
import { CreateProviceProfileForPractice } from './create-provider-profile-for-practice';
import { ListPracticeProfilesByUserId } from './list-practice-profiles-by-user-id';
import { GetProfileByUserId } from './get-profile-by-user-id';

export const profilesFactory = (params: ProvidersServiceParams) => ({
    createProfileForPractice: CreateProviceProfileForPractice.factory(params),
    listPracticeProfilesByUserId: ListPracticeProfilesByUserId.factory(params),
    getProfileByUserId: GetProfileByUserId.factory(params),
    getProfileById: () => {},
});
