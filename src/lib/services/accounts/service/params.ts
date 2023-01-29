import { VendorAuth0 } from '@/lib/vendors/auth0';
import { FirebaseAdminVendor } from '@/lib/vendors/firebase-admin';
import { VendorStripe } from '@/lib/vendors/stripe';
import { PrismaClient } from '@prisma/client';

export interface AccountsServiceParams {
    prisma: PrismaClient;
    auth0: VendorAuth0;
    stripe: VendorStripe;
    firebaseAdmin: FirebaseAdminVendor;
}
