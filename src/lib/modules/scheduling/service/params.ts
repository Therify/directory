import { VendorNylas } from '@/lib/shared/vendors/nylas';
import { PrismaClient } from '@prisma/client';

export interface SchedulingServiceParams {
    prisma: PrismaClient;
    nylas: VendorNylas;
}
