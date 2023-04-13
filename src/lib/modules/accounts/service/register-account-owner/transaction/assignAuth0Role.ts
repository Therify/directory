import { withNodeEnvironmentConfiguration } from '@/lib/shared/configuration';
import { getRoleByEnvironment } from '@/lib/shared/types';
import { TRANSACTION_STEPS, RegisterAccountOwner } from './definition';

export const assignAuth0Role: RegisterAccountOwner['ASSIGN_AUTH0_ROLE'] = {
    async commit(
        _,
        { auth0 },
        { [TRANSACTION_STEPS.CREATE_AUTH0_USER]: { auth0UserId } }
    ) {
        const [memberRoleId, accountOwnerRoleId] =
            withNodeEnvironmentConfiguration((CONFIG) => {
                return [
                    getRoleByEnvironment('member', CONFIG.NODE_ENV),
                    getRoleByEnvironment('account_owner', CONFIG.NODE_ENV),
                ];
            });
        auth0.assignUserRoles({
            userId: auth0UserId,
            roles: [memberRoleId, accountOwnerRoleId],
        });
    },
    async rollback() {},
};
