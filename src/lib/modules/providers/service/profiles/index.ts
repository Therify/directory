import { ProvidersServiceParams } from '../params';
import { CreateProviceProfileForPractice } from './create-provider-profile-for-practice';
import { ListPracticeProfilesByUserId } from './list-practice-profiles-by-user-id';
import { GetProfileByUserId } from './get-profile-by-user-id';
import { GetProfileById } from './get-profile-by-id';
import { UpdateProviderProfile } from './update-provider-profile';
import { DeleteProviderProfile } from './delete-provider-profile';

export const profilesFactory = (params: ProvidersServiceParams) => ({
    createProfileForPractice: CreateProviceProfileForPractice.factory(params),
    listPracticeProfilesByUserId: ListPracticeProfilesByUserId.factory(params),
    getProfileByUserId: GetProfileByUserId.factory(params),
    getProfileById: GetProfileById.factory(params),
    updateProviderProfile: UpdateProviderProfile.factory(params),
    deleteProviderProfile: DeleteProviderProfile.factory(params),
});
