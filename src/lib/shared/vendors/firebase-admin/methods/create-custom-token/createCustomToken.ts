import * as firebaseAdmin from 'firebase-admin';

export const createCustomTokenFactory =
    ({ admin }: { admin: typeof firebaseAdmin }) =>
    async ({ userId, email }: { userId: string; email?: string }) => {
        const token = await admin.auth().createCustomToken(userId, { email });
        return token;
    };
