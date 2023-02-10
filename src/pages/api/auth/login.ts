import { handleLogin, LoginHandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await handleLogin(req, res);
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
