import { VendorStripe } from '@/lib/vendors/stripe';
import { PrismaClient } from '@prisma/client';
import { AccountsService } from '../../accounts';

export interface StripeWebhookParams {
    stripe: VendorStripe;
    prisma: PrismaClient;
    accounts: AccountsService;
}
