import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { jotformWebhookService } from '@/lib/modules/webhooks/services/jotform';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const rawReq = await buffer(req);
    const data = rawReq.toString().split('-----').filter(Boolean);
    const rawBodyItem = data.find((item) => item.includes('name="rawRequest"'));
    const payload = rawBodyItem?.split('\r\n').filter(Boolean)[2];
    if (!payload) {
        throw new Error('Could not find submission payload');
    }
    try {
        const result = await jotformWebhookService.handleFormSubmission(
            JSON.parse(payload)
        );
        res.send({ received: true });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(400).send(error);
        }
        return res.status(500).send(`Webhook Error: ${error}`);
    }
};

export default handler;
