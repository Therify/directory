import Stripe from 'stripe';
import { buffer } from 'micro';
import { vendorStripe } from '@/lib/vendors/stripe';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const signature = req.headers['stripe-signature'] as string;
    const signingSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const rawBody = await buffer(req);
    let event: Stripe.Event;
    try {
        event = vendorStripe.constructEvent({
            rawBody,
            signature,
            signingSecret,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send(`Webhook Error: ${error}`);
    }
    console.log(event);
    // Switch to handle event types
    res.send({ received: true });
};

export default handler;
