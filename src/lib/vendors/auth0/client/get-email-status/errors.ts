const GET_EMAIL_STATUS_ERROR_CODES = [400, 401, 403, 409, 429] as const;

type GetEmailStatusErrorCode = typeof GET_EMAIL_STATUS_ERROR_CODES[number];

class GetEmailStatusError extends Error {
    constructor(
        public readonly code: GetEmailStatusErrorCode,
        public override readonly message: string
    ) {
        super(message);
    }
}

class BadRequestError extends GetEmailStatusError {
    constructor(message = 'Bad Request') {
        super(400, message);
        this.name = 'BadRequestError';
    }
}

class UnauthorizedError extends GetEmailStatusError {
    constructor(message = 'Unauthorized') {
        super(401, message);
        this.name = 'UnauthorizedError';
    }
}

class ForbiddenError extends GetEmailStatusError {
    constructor(message = 'Forbidden') {
        super(403, message);
        this.name = 'ForbiddenError';
    }
}

class ConflictError extends GetEmailStatusError {
    constructor(message = 'Conflict') {
        super(409, message);
        this.name = 'ConflictError';
    }
}

class TooManyRequestsError extends GetEmailStatusError {
    constructor(message = 'Too Many Requests') {
        super(429, message);
        this.name = 'TooManyRequestsError';
    }
}

const GET_EMAIL_STATUS_ERROR_MAP = {
    400: ['Bad Request', BadRequestError],
    401: ['Unauthorized', UnauthorizedError],
    403: ['Forbidden', ForbiddenError],
    409: ['Conflict', ConflictError],
    429: ['Too Many Requests', TooManyRequestsError],
} as const;

export function handleGetEmailStatusError(error: Error, response: Response) {
    const [message, errorClass] =
        GET_EMAIL_STATUS_ERROR_MAP[
            response.status as keyof typeof GET_EMAIL_STATUS_ERROR_MAP
        ];
    if (errorClass) {
        throw new errorClass(error.message ?? message);
    }
    throw new GetEmailStatusError(
        response.status as GetEmailStatusErrorCode,
        error.message ?? 'Unknown Error'
    );
}
