import { Role } from '@prisma/client';
import { hasRole } from './hasRole';

export const isMember = (roles: string) => {
    return hasRole(Role.member, roles);
};
