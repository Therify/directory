import prisma from '@/lib/prisma/client';
import { CreateConnectionRequest } from './create-connection-request';
import { ListConnectionRequestsByProviderId } from './list-connection-requests-by-provider-id';
import { ListConnectionRequestsByPracticeOwnerId } from './list-connection-requests-by-practice-owner-id';
import { DirectoryServiceParams } from './params';
import { UpdateConnectionRequestStatus } from './update-connection-request-status';

const params: DirectoryServiceParams = {
    prisma,
};

export const directoryService = {
    createConnectionRequest: CreateConnectionRequest.factory(params),
    listConnectionRequestsByProviderId:
        ListConnectionRequestsByProviderId.factory(params),
    listConnectionRequestsByPracticeOwnerId:
        ListConnectionRequestsByPracticeOwnerId.factory(params),
    updateConnectionRequestStatus:
        UpdateConnectionRequestStatus.factory(params),
};

export type DirectoryService = typeof directoryService;
