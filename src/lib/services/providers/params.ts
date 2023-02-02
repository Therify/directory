import { FirebaseAdminVendor } from '@/lib/vendors/firebase-admin';
import { PrismaClient } from '@prisma/client';

export interface ProvidersServiceParams {
    prisma: PrismaClient;
    firebaseAdmin: FirebaseAdminVendor;
}
