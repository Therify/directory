import { ProvidersServiceParams } from '../params';
import { GetPracticeByOwnerId } from './get-practice-by-owner-id';

export const practiceFactory = (params: ProvidersServiceParams) => ({
    getPracticeByOwnerId: GetPracticeByOwnerId.factory(params),
});
