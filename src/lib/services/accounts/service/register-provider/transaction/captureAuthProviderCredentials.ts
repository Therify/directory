import { AuthenticationProvider } from '@therify/concepts';
import { RegisterProviderTransaction } from './definition';

export const step: RegisterProviderTransaction['captureAuthProviderCredentials'] =
    {
        async commit(
            { orm },
            {
                createAuth0User: { auth0UserId },
                createTherifyUserEntity: { therifyUserId },
            }
        ) {
            await orm.userAuthenticationProviderCredentials.create({
                data: {
                    authenticationProviderId: AuthenticationProvider.Auth0.id,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    credential: auth0UserId!,
                    userId: therifyUserId,
                },
            });
            return;
        },
        rollback() {
            return;
        },
    };
