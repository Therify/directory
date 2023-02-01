import { Role } from '@prisma/client';

export const hasRole = (role: Role, userRoleString: string) => {
    const roles = userRoleString.split(',');
    return roles.includes(role);
};
