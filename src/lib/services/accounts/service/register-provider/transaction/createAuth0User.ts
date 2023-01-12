import { RegisterProvider } from '@/lib/features/registration';
import { RegisterProviderTransaction } from './definition';

interface CreateAuth0UserFactory {
    (
        params: RegisterProvider.Input
    ): RegisterProviderTransaction['createAuth0User'];
}

export const factory: CreateAuth0UserFactory = ({
    providerDetails: { emailAddress, password },
}) => {
    return {
        async commit(
            { auth0 },
            { createTherifyUserEntity: { therifyUserId } }
        ) {
            const { user_id: auth0UserId } = await auth0.createUser({
                email: emailAddress,
                password,
                user_metadata: {
                    therify_user_id: therifyUserId,
                },
            });
            return {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                auth0UserId: auth0UserId!,
                emailAddress,
            };
        },
        rollback({ auth0 }, { createAuth0User: { auth0UserId } }) {
            return auth0.deleteUser({ user_id: auth0UserId });
        },
    };
};
