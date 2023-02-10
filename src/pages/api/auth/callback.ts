import { getUrls } from '@/lib/shared/utils';
import { handleCallback, CallbackHandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { redirectUri } = getUrls(req);
        await handleCallback(req, res, {
            redirectUri: redirectUri,
        });
        res.end();
    } catch (error) {
        console.error(error);
        if (error instanceof CallbackHandlerError) {
            res.status(error.status ?? 400).end(error.message);
            return;
        }
        res.status(500).end(
            (error as { message: string }).message ??
                'An unknown callback error occurred.'
        );
    }
}
