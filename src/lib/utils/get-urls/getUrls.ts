import { NextApiRequest } from 'next';

export function getUrls(req: NextApiRequest) {
    const host = req.headers['host'];
    const protocol = process.env.VERCEL_URL ? 'https' : 'http';
    const redirectUri = `${protocol}://${host}/api/auth/callback`;
    const returnTo = `${protocol}://${host}`;
    return {
        redirectUri,
        returnTo,
    };
}
