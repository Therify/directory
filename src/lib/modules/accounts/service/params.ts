import { VendorAuth0 } from '@/lib/shared/vendors/auth0';
import { FirebaseAdminVendor } from '@/lib/shared/vendors/firebase-admin';
import { VendorStreamChat } from '@/lib/shared/vendors/stream-chat';
import { VendorStripe } from '@/lib/shared/vendors/stripe';
import { PrismaClient } from '@prisma/client';

export interface AccountsServiceParams {
    prisma: PrismaClient;
    auth0: VendorAuth0;
    stripe: VendorStripe;
    streamChat: VendorStreamChat;
    firebaseAdmin: FirebaseAdminVendor;
}
