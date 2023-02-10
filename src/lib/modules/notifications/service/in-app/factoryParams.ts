import { PrismaClient } from '@prisma/client';
import { FirebaseVendor } from '@/lib/shared/vendors/firebase';

export interface InAppNotificationsFactoryParams {
    orm: PrismaClient;
    firebase: FirebaseVendor;
}
