import { PermissionDeniedError } from '../../errors/permissionDeniedError';
import { FirebaseError } from '../../errors/schema';
import { FirebaseIntent } from '../../intents';

class ReadDataError extends Error {
    public readonly code: string;
    public readonly intent: FirebaseIntent;
    constructor(public override readonly message: string, code?: string) {
        super(message);
        this.intent = FirebaseIntent.ReadData;
        this.code = code ?? 'READ_DATA_VENDOR_ERROR';
    }
}

export function processReadDataError(error: FirebaseError) {
    if (!error.code && error.message.includes('Permission denied')) {
        // This is a workaround. firebase.database.get threw errors with no 'code' attribute
        return new PermissionDeniedError({
            intent: FirebaseIntent.ReadData,
            message: 'Permission denied.',
        });
    }

    switch (error.code) {
        case 'PERMISSION_DENIED':
            return new PermissionDeniedError({
                intent: FirebaseIntent.ReadData,
                message: 'Permission denied.',
            });
        default:
            return new ReadDataError(error.message, error.code);
    }
}
