import { CreateFirebaseAuthToken } from '@/lib/modules/users/features';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ firebaseAdmin }: AccountsServiceParams) =>
    async ({
        userId,
        email,
    }: CreateFirebaseAuthToken.Input): Promise<CreateFirebaseAuthToken.Output> => {
        return await firebaseAdmin.createCustomToken({
            userId,
            email,
        });
    };
