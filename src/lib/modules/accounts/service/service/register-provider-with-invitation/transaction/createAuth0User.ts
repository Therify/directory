import { getNodeEnvironmentConfiguration } from '@/lib/shared/configuration';
import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import { RegisterProviderWithInitationTransaction } from './definition';

interface CreateAuth0UserFactory {
    (
        params: RegisterProviderWithInvitation.Input
    ): RegisterProviderWithInitationTransaction['createAuth0User'];
}

export const factory: CreateAuth0UserFactory = ({ emailAddress, password }) => {
    return {
        async commit({ auth0 }) {
            // TODO: Turn back on when Auth0 email is designed
            // const shouldVerifyEmail = withNodeEnvironmentConfiguration(
            //     (CONFIG) => CONFIG.NODE_ENV === 'production'
            // );
            const shouldVerifyEmail = false;
            const { user_id: auth0UserId } = await auth0.createUser({
                email: emailAddress,
                password,
                verify_email: shouldVerifyEmail,
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
