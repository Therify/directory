import { prisma } from '@/lib/prisma';
import { CreateUser } from './create-user';

export const AccountsService = {
    createUser: CreateUser.factory({
        prisma,
    }),
};

export type AccountsService = typeof AccountsService;
