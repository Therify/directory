import { Role } from '@prisma/client';
import { hasRole } from './hasRole';

export const isCoach = (roles: string) => {
    return hasRole(Role.provider_coach, roles);
};
