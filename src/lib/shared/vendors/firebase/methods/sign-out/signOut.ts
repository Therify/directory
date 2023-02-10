import { signOut, Auth } from 'firebase/auth';
/**
 * Signs out the user authenticated with this Firbease instance
 * @returns Promise<void>
 */
export const signOutFactory =
    ({ auth }: { auth: Auth }) =>
    async () => {
        return await signOut(auth);
    };
