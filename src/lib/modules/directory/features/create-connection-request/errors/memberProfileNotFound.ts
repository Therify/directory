import { HttpError } from '@/lib/shared/errors/http-error/httpError';

export class MemberProfileNotFound extends HttpError {
    constructor() {
        super(404, 'Member profile not found');
    }
}
