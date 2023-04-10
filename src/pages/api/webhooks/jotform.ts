import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { jotformWebhookService } from '@/lib/modules/webhooks/services/jotform';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const rawReq = await buffer(req);
    const data = rawReq.toString().split('-----').filter(Boolean);
    const rawBodyItem = data.find((item) => item.includes('name="rawRequest"'));
    const rawFormId = data.find((item) => item.includes('name="formID"'));
    const rawSubmissionId = data.find((item) =>
        item.includes('name="submissionID"')
    );
    const payload = rawBodyItem?.split('\r\n').filter(Boolean)[2];
    const formId = rawFormId?.split('\r\n').filter(Boolean)[2];
    const submissionId = rawSubmissionId?.split('\r\n').filter(Boolean)[2];

    if (!payload || !formId || !submissionId) {
        throw new Error('Missing submission data');
    }

    try {
        const result = await jotformWebhookService.handleFormSubmission({
            formId,
            submissionId,
            payload: JSON.parse(payload),
        });
        res.send({ received: !!result?.success });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(400).send(error);
        }
        return res.status(500).send(`Webhook Error: ${error}`);
    }
};

export default handler;
