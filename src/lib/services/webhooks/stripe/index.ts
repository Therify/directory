import { vendorStripe as stripe } from '@/lib/vendors/stripe';
import { AccountsService } from '@/lib/services/accounts';
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

interface HandleEventParams {
    rawBody: string | Buffer;
    signature: string;
    signingSecret: string;
}

export const stripeWebhookService = {
    handleEvent: (eventParams: HandleEventParams) => {
        const handleEvent = handleEventFactory(webhookContext);
        const { data, type } = stripe.constructEvent(eventParams);

        return handleEvent({ data, type });
    },
};

export type StripeWebhookServiceV1 = typeof stripeWebhookService;
