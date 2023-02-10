import Stripe from 'stripe';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { stripeWebhookService } from '@/lib/modules/webhooks/services';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const signature = req.headers['stripe-signature'] as string;
    const signingSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const rawBody = await buffer(req);
    try {
        const result = await stripeWebhookService.handleEvent({
            rawBody,
            signature,
            signingSecret,
        });
        res.send({ received: !!result?.success });
    } catch (error) {
        console.error(error);
        if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
            return res.status(400).send(error);
        }
        return res.status(500).send(`Webhook Error: ${error}`);
    }
};

export default handler;
