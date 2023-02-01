import { Role } from '@prisma/client';
import { isCoach } from './isCoach';
import { isTherapist } from './isTherapist';

export const isProvider = (roles: string) => {
    return isCoach(roles) || isTherapist(roles);
};
