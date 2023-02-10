import { PermissionDeniedError } from '../../errors/permissionDeniedError';
import { FirebaseError } from '../../errors/schema';
import { FirebaseIntent } from '../../intents';

class SetDataError extends Error {
    public readonly code: string;
    public readonly intent: FirebaseIntent;
    constructor(public override readonly message: string, code?: string) {
        super(message);
        this.intent = FirebaseIntent.ReadData;
        this.code = code ?? 'SET_DATA_VENDOR_ERROR';
    }
}

export function processSetDataError(error: FirebaseError) {
    switch (error.code) {
        case 'PERMISSION_DENIED':
            return new PermissionDeniedError({
                intent: FirebaseIntent.ReadData,
                message: 'Permission denied.',
            });
        default:
            return new SetDataError(error.message, error.code);
    }
}
