import { PrismaClient } from '@prisma/client';
import { MessagingService } from '@/lib/modules/messaging/service';

export interface DirectoryServiceParams {
    prisma: PrismaClient;
    messaging: MessagingService;
}
