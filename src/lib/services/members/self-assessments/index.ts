import { MembersServiceParams } from '../params';
import { ListSelfAssessmentsByUserId } from './list-by-user-id';

export const selfAssessmentsFactory = (params: MembersServiceParams) => ({
    listByUserId: ListSelfAssessmentsByUserId.factory(params),
});
