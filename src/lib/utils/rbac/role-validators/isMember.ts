import { Role } from '@prisma/client';
import { hasRole } from './hasRole';

export const isMember = (roles: string | undefined) => {
    return hasRole(Role.member, roles);
};
