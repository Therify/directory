import { ProvidersServiceParams } from '../params';
import { GetPracticeByOwnerId } from './get-practice-by-owner-id';
import { GetPracticeByProviderId } from './get-practice-by-provider-id';

export const practiceFactory = (params: ProvidersServiceParams) => ({
    getPracticeByOwnerId: GetPracticeByOwnerId.factory(params),
    getPracticeByProviderId: GetPracticeByProviderId.factory(params),
});
