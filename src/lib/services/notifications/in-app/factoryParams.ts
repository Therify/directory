import { PrismaClient } from '@prisma/client';
import { FirebaseVendor } from '@/lib/vendors/firebase';

export interface InAppNotificationsFactoryParams {
    orm: PrismaClient;
    firebase: FirebaseVendor;
}
