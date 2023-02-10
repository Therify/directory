import { handleProfile, ProfileHandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function callback(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await handleProfile(req, res);
        res.end();
    } catch (error) {
        if (error instanceof ProfileHandlerError) {
            res.status(error.status ?? 400).end(error.message);
        }
        res.status(500).end(
            (error as { message: string }).message ??
                'An unknown profile error occurred.'
        );
    }
}
