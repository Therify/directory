import { Role } from '@prisma/client';
import { hasRole } from './hasRole';

export const isTherapist = (roles: string) => {
    return hasRole(Role.provider_therapist, roles);
};
