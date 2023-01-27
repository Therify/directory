import { signInWithCustomToken, Auth } from 'firebase/auth';
/**
 * Signs in this Firbease instance as a user with a custom token created by Firebase Admin.
 * @param token
 * @returns Promise<FirebaseUserCredential>
 */
export const authenticateWithCustomTokenFactory =
    ({ auth }: { auth: Auth }) =>
    async (token: string) => {
        return await signInWithCustomToken(auth, token);
    };
