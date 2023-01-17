import { handleLogout, LogoutHandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await handleLogout(req, res);
    } catch (error) {
        if (error instanceof LogoutHandlerError) {
            res.status(error.status ?? 400).end(error.message);
        }
        res.status(500).end(
            (error as { message: string }).message ??
                'An unknown logout error occurred.'
        );
    }
}
