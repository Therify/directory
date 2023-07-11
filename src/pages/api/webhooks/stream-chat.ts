import { NextApiRequest, NextApiResponse } from 'next/types';
import { buffer } from 'micro';
import { streamChatWebhookService } from '@/lib/modules/webhooks/services/stream-chat';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        return;
    }
    const signature = req.headers['x-signature'] as string;
    const rawBody = await buffer(req);

    try {
        const result = await streamChatWebhookService.handleEvent({
            requestBody: rawBody.toString(),
            signature,
        });
        res.send({ received: !!result?.success });
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Webhook Error: ${error}`);
    }
};

export default handler;
