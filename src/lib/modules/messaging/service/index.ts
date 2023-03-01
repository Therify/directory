import { prisma } from '@/lib/prisma';
import { vendorStreamChat } from '@/lib/shared/vendors/stream-chat';
import { CreateChannel } from './create-channel';

export const messagingService = {
    createChannel: CreateChannel.factory({
        prisma,
        streamChat: vendorStreamChat,
    }),
};

export type MessagingService = typeof messagingService;
