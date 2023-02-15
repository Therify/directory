import { ProvidersServiceParams } from '../../params';
import { GetPracticeProfilesPageProps } from './get-practice-profiles-page-props';
import { GetPracticeCreateProfilesPageProps } from './get-practice-create-profile-page-props';
import { GetPracticeProfileEditorPageProps } from './get-practice-profile-editor-page-props';

export const practicePagesFactory = (params: ProvidersServiceParams) => ({
    getPracticeProfilesPageProps: GetPracticeProfilesPageProps.factory(params),
    getPracticeCreateProfilePageProps:
        GetPracticeCreateProfilesPageProps.factory(params),
    getPracticeProfileEditorPageProps:
        GetPracticeProfileEditorPageProps.factory(params),
});
