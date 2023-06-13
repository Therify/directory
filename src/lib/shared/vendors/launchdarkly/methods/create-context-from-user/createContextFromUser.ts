import { TherifyUser } from '@/lib/shared/types';

export const method = (user: TherifyUser.TherifyUser) => {
    return {
        key: user.userId,
        email: user.emailAddress,
    };
};
