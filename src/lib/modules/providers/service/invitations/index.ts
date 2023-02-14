import { ProvidersServiceParams } from '../params';
import { CreatePracticeProviderInvitation } from './create-practice-provider-invitation';

export const invitationsFactory = (params: ProvidersServiceParams) => ({
    createPracticeProviderInvitation:
        CreatePracticeProviderInvitation.factory(params),
    acceptPracticeProviderInvitation: () => {},
    declinePracticeProviderInvitation: () => {},
    expirePracticeProviderInvitation: () => {},
    deletePracticeProviderInvitation: () => {},
});
