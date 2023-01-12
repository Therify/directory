import { PrismaClient } from '@prisma/client';

export interface AccountsServiceParams {
    orm: PrismaClient;
    auth0: VendorAuth0;
    stripe: VendorStripe;
}
