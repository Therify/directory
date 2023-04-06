import prisma from '@/lib/prisma/client';
import { messagingService } from '@/lib/modules/messaging/service';
import { CreateConnectionRequest } from './create-connection-request';
import { ListConnectionRequestsByProviderId } from './list-connection-requests-by-provider-id';
import { ListConnectionRequestsByPracticeOwnerId } from './list-connection-requests-by-practice-owner-id';
import { DirectoryServiceParams } from './params';
import { UpdateConnectionRequestStatus } from './update-connection-request-status';
import { ExecuteProviderSearch } from './execute-provider-search';
import { GenerateRecommendations } from './generate-recommendations';

const params: DirectoryServiceParams = {
    prisma,
    messaging: messagingService,
};

export const directoryService = {
    executeProviderSearch: ExecuteProviderSearch.factory(params),
    createConnectionRequest: CreateConnectionRequest.factory(params),
    listConnectionRequestsByProviderId:
        ListConnectionRequestsByProviderId.factory(params),
    listConnectionRequestsByPracticeOwnerId:
        ListConnectionRequestsByPracticeOwnerId.factory(params),
    updateConnectionRequestStatus:
        UpdateConnectionRequestStatus.factory(params),
    generateRecommendations: GenerateRecommendations.factory(params),
};

export type DirectoryService = typeof directoryService;
