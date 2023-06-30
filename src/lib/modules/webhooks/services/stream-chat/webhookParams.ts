import { PrismaClient } from '@prisma/client';
import { AccountsService } from '../../../accounts/service';
import { NotificationsService } from '@/lib/modules/notifications/service';

export interface StreamChatWebhookParams {
    prisma: PrismaClient;
    notifications: NotificationsService;
}
