import {
    getSession,
    handleLogin,
    LoginHandlerError,
    updateSession,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession(req, res);
        updateSession(req, res, {
            ...session,
            user: { ...session?.user, name: 'John Doe' },
        });
        await handleLogin(req, res);
    } catch (error) {
        if (error instanceof LoginHandlerError) {
            res.status(error.status ?? 400).end(error.message);
        }
        res.status(500).end(
            (error as { message: string }).message ??
                'An unknown login error occurred.'
        );
    }
}
