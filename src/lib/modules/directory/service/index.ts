import prisma from '@/lib/prisma/client';
import { CreateConnectionRequest } from './create-connection-request';
import { ListConnectionRequestsByProviderId } from './list-connection-requests-by-provider-id';
import { DirectoryServiceParams } from './params';

const params: DirectoryServiceParams = {
    prisma,
};

export const directoryService = {
    createConnectionRequest: CreateConnectionRequest.factory(params),
    listConnectionRequestsByProviderId:
        ListConnectionRequestsByProviderId.factory(params),
};

export type DirectoryService = typeof directoryService;
