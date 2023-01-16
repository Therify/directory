import { VendorAuth0 } from '@/lib/vendors/auth0';
import { VendorStripe } from '@/lib/vendors/stripe';
import { PrismaClient } from '@prisma/client';

export interface AccountsServiceParams {
    prisma: PrismaClient;
    auth0: VendorAuth0;
    stripe: VendorStripe;
}
