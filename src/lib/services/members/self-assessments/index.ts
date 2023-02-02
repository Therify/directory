import { MembersServiceParams } from '../params';
import { ListSelfAssessmentsByUserId } from './list-by-user-id';

export const selfAssessmentsFactory = (params: MembersServiceParams) => ({
    getByUserId: ListSelfAssessmentsByUserId.factory(params),
});
