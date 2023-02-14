import { ProvidersServiceParams } from '../params';
import { GetPracticeByUserId } from './get-practice-by-user-id';

export const practiceFactory = (params: ProvidersServiceParams) => ({
    getPracticeByUserId: GetPracticeByUserId.factory(params),
});
