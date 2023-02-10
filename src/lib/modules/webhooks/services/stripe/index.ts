import { vendorStripe as stripe } from '@/lib/shared/vendors/stripe';
import { AccountsService } from '@/lib/modules/accounts/service';
import { StripeWebhookParams } from './webhookParams';
import { handleEventFactory } from './handle-event';
import { prisma } from '@/lib/prisma';

export const STRIPE_WEBHOOK_IDENTIFIER = 'STRIPE_WEBHOOK';

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
