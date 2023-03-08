import { signOut, Auth } from 'firebase/auth';
/**
 * Signs out the user authenticated with this Firbease instance
 * @returns Promise<void>
 */
export const signOutFactory =
    ({ auth }: { auth: Auth }) =>
    async (preSignoutActions: Array<(() => void) | null | undefined>) => {
        try {
            await Promise.all(preSignoutActions.map((action) => action?.()));
        } catch (error) {
            console.error('Pre signout actions failed', error);
        }
        return await signOut(auth);
    };
