import { Role } from '@prisma/client';

export const hasRole = (role: Role, userRoleString: string | undefined) => {
    const roles = (userRoleString ?? '').split(',');
    return roles.includes(role);
};
