import { FirebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { PrismaClient } from '@prisma/client';

export interface MembersServiceParams {
    prisma: PrismaClient;
    firebaseAdmin: FirebaseAdminVendor;
}
