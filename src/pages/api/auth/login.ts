import { getUrls } from '@/lib/utils';
import { handleLogin, LoginHandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { redirectUri } = getUrls(req);
        await handleLogin(req, res, {
            authorizationParams: {
                redirect_uri: redirectUri,
            },
        });
        res.end();
    } catch (error) {
        if (error instanceof LoginHandlerError) {
            console.error(error);
            res.status(error.status ?? 400).end(error.message);
            return;
        }
        res.status(500).end(
            (error as { message: string }).message ??
                'An unknown login error occurred.'
        );
    }
}
