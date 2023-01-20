import { vendorStripe as stripe } from '@/lib/vendors/stripe';
import { AccountsService } from '@/lib/services/accounts';
import { constructEventFactory, ConstructEventParams } from './construct-event';
import { StripeWebhookParams } from './webhookParams';
import { handleEventFactory } from './handle-event';
import { PrismaClient } from '@prisma/client';

export const STRIPE_WEBHOOK_IDENTIFIER = 'STRIPE_WEBHOOK';

const prisma = new PrismaClient({
    log: [{ level: 'query', emit: 'stdout' }],
});

const webhookContext: StripeWebhookParams = {
    stripe,
    prisma,
    accounts: AccountsService,
};
export const stripeWebhookService = {
    handleEvent: (eventParams: ConstructEventParams) => {
        const constructEvent = constructEventFactory(webhookContext);
        const handleEvent = handleEventFactory(webhookContext);

        const constructedEvent = constructEvent(eventParams);
        return handleEvent(constructedEvent);
    },
};

export type StripeWebhookServiceV1 = typeof stripeWebhookService;
