import { VendorStreamChat } from '@/lib/shared/vendors/stream-chat';
import { PrismaClient } from '@prisma/client';

export interface MessageServiceParams {
    prisma: PrismaClient;
    streamChat: VendorStreamChat;
}
