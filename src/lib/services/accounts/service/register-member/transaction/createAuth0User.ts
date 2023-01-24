import { withNodeEnvironmentConfiguration } from '@/lib/configuration';
import { TRANSACTION_STEPS, RegisterMemberTransaction } from './definition';

export const createAuth0User: RegisterMemberTransaction['CREATE_AUTH0_USER'] = {
    async commit(input, { auth0 }) {
        const shouldVerifyEmail = withNodeEnvironmentConfiguration(
            (CONFIG) => CONFIG.NODE_ENV === 'production'
        );
        const user = await auth0.createUser({
            email: input.emailAddress,
            password: input.password,
            connection: 'Username-Password-Authentication',
            verify_email: shouldVerifyEmail,
        });
        return {
            auth0UserId: user.user_id!,
        };
    },
    async rollback(
        input,
        { auth0 },
        { [TRANSACTION_STEPS.CREATE_AUTH0_USER]: { auth0UserId } }
    ) {
        await auth0.deleteUser(auth0UserId);
    },
};
