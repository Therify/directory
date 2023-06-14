import { withNodeEnvironmentConfiguration } from '@/lib/shared/configuration';
import { getRoleByEnvironment } from '@/lib/shared/types';
import { TRANSACTION_STEPS, RegisterDTCMemberTransaction } from './definition';

export const assignAuth0Role: RegisterDTCMemberTransaction['ASSIGN_AUTH0_ROLE'] =
    {
        async commit(
            { role },
            { auth0 },
            { [TRANSACTION_STEPS.CREATE_AUTH0_USER]: { auth0UserId } }
        ) {
            const memberRoleId = withNodeEnvironmentConfiguration((CONFIG) =>
                getRoleByEnvironment(role, CONFIG.NODE_ENV)
            );
            await auth0.assignUserRoles({
                userId: auth0UserId,
                roles: [memberRoleId],
            });
        },
        async rollback() {},
    };
