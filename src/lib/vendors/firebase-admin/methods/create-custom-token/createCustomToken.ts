import * as firebaseAdmin from 'firebase-admin';

export const createCustomTokenFactory =
    ({ admin }: { admin: ReturnType<typeof firebaseAdmin.initializeApp> }) =>
    async ({ userId, email }: { userId: string; email?: string }) => {
        const token = await admin.auth().createCustomToken(userId, { email });
        return token;
    };
