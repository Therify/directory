import { ProvidersServiceParams } from '../params';
import { CreatePracticeProviderInvitation } from './create-practice-provider-invitation';
import { DeletePracticeProviderInvitation } from './delete-practice-provider-invitation';

export const invitationsFactory = (params: ProvidersServiceParams) => ({
    createPracticeProviderInvitation:
        CreatePracticeProviderInvitation.factory(params),
    declinePracticeProviderInvitation: () => {},
    expirePracticeProviderInvitation: () => {},
    deletePracticeProviderInvitation:
        DeletePracticeProviderInvitation.factory(params),
});
