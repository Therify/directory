import { PermissionDeniedError } from '../../errors/permissionDeniedError';
import { FirebaseError } from '../../errors/schema';
import { FirebaseIntent } from '../../intents';

class PushDataError extends Error {
    public readonly code: string;
    public readonly intent: FirebaseIntent;
    constructor(public override readonly message: string, code?: string) {
        super(message);
        this.intent = FirebaseIntent.PushData;
        this.code = code ?? 'PUSH_DATA_VENDOR_ERROR';
    }
}

export function processPushDataError(error: FirebaseError) {
    switch (error.code) {
        case 'PERMISSION_DENIED':
            return new PermissionDeniedError({
                intent: FirebaseIntent.PushData,
                message: 'Permission denied.',
            });
        default:
            return new PushDataError(error.message, error.code);
    }
}
