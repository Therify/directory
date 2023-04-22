import { HttpError } from '@/lib/shared/errors/http-error/httpError';

export class ProviderProfileNotFound extends HttpError {
    constructor() {
        super(404, 'Provider profile not found');
    }
}
