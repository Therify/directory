import { PermissionDeniedError } from '../../errors';
import { FirebaseError } from '../../errors/schema';
import { FirebaseIntent } from '../../intents';

export class UpdateDataError extends Error {
    public readonly code: string;
    public readonly intent: FirebaseIntent;
    constructor(public override readonly message: string, code?: string) {
        super(message);
        this.intent = FirebaseIntent.UpdateData;
        this.code = code ?? 'UPDATE_DATA_VENDOR_ERROR';
    }
}

export function processUpdateDataError(error: FirebaseError) {
    switch (error.code) {
        case 'PERMISSION_DENIED':
            return new PermissionDeniedError({
                intent: FirebaseIntent.UpdateData,
                message: 'Permission denied.',
            });
        default:
            return new UpdateDataError(error.message, error.code);
    }
}
