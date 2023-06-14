// import { withNodeEnvironmentConfiguration } from '@/lib/shared/configuration';
import { TRANSACTION_STEPS, RegisterDTCMemberTransaction } from './definition';

export const createAuth0User: RegisterDTCMemberTransaction['CREATE_AUTH0_USER'] =
    {
        async commit(input, { auth0 }) {
            // TODO: Turn back on when Auth0 email is designed
            // const shouldVerifyEmail = withNodeEnvironmentConfiguration(
            //     (CONFIG) => CONFIG.NODE_ENV === 'production'
            // );
            const shouldVerifyEmail = false;
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
            _,
            { auth0 },
            { [TRANSACTION_STEPS.CREATE_AUTH0_USER]: { auth0UserId } }
        ) {
            await auth0.deleteUser(auth0UserId);
        },
    };
