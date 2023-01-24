import { getNodeEnvironmentConfiguration } from '@/lib/configuration';
import { getRoleByEnvironment, Role } from '@/lib/types/roles';
import { RegisterProviderTransaction } from './definition';

export const factory: (
    role: Role
) => RegisterProviderTransaction['assignAuth0Roles'] = (role) => {
    return {
        async commit({ auth0 }, { createAuth0User: { auth0UserId } }) {
            await auth0.assignUserRoles({
                userId: auth0UserId,
                roles: [
                    getRoleByEnvironment(
                        role,
                        getNodeEnvironmentConfiguration().NODE_ENV
                    ),
                ],
            });
        },
        rollback({ auth0 }) {},
    };
};
