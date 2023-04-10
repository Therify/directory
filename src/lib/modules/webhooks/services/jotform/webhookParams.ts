import { PrismaClient } from '@prisma/client';
import { AccountsService } from '../../../accounts/service';

export interface JotformWebhookParams {
    prisma: PrismaClient;
    accounts: AccountsService;
}
