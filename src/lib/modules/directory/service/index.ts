import prisma from '@/lib/prisma/client';
import { CreateConnectionRequest } from './create-connection-request';

export const directoryService = {
    createConnectionRequest: CreateConnectionRequest.factory({
        prisma,
    }),
};

export type DirectoryService = typeof directoryService;
