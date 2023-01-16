import { RegisterProvider } from '@/lib/features/registration';
import { RegisterProviderTransaction } from './definition';

interface CreateAuth0UserFactory {
    (
        params: RegisterProvider.Input
    ): RegisterProviderTransaction['createAuth0User'];
}

export const factory: CreateAuth0UserFactory = ({ emailAddress, password }) => {
    return {
        async commit({ auth0 }) {
            const { user_id: auth0UserId } = await auth0.createUser({
                email: emailAddress,
                password,
                verify_email: process.env.NODE_ENV === 'production',
            });
            if (!auth0UserId) throw new Error('No Auth0 user ID was returned.');
            return {
                auth0UserId,
                emailAddress,
            };
        },
        rollback({ auth0 }, { createAuth0User: { auth0UserId } }) {
            return auth0.deleteUser(auth0UserId);
        },
    };
};
