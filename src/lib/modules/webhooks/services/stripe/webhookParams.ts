import { VendorStripe } from '@/lib/shared/vendors/stripe';
import { PrismaClient } from '@prisma/client';
import { AccountsService } from '../../../accounts/service';

export interface StripeWebhookParams {
    stripe: VendorStripe;
    prisma: PrismaClient;
    accounts: AccountsService;
}
