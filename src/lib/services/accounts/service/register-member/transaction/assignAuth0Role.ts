import { withNodeEnvironmentConfiguration } from '@/lib/configuration';
import { getRoleByEnvironment } from '@/lib/types';
import { TRANSACTION_STEPS, RegisterMemberTransaction } from './definition';

export const assignAuth0Role: RegisterMemberTransaction['ASSIGN_AUTH0_ROLE'] = {
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
