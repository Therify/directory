import { DirectoryServiceParams } from '../params';
import { GetSelfAssessmentsByUserId } from './get-by-user-id';

export const selfAssessmentsFactory = (params: DirectoryServiceParams) => ({
    getByUserId: GetSelfAssessmentsByUserId.factory(params),
});
