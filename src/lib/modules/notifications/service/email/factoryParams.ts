import { PrismaClient } from '@prisma/client';
import { VendorKnock } from '@/lib/shared/vendors/knock';

export interface EmailNotificationsFactoryParams {
    orm: PrismaClient;
    knock: VendorKnock;
}
