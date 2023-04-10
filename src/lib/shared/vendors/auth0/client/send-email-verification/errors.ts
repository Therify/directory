const SEND_VERIFICATION_EMAIL_ERROR_CODES = [400, 401, 403, 409, 429] as const;

type SendVerificationEmailErrorCode =
    (typeof SEND_VERIFICATION_EMAIL_ERROR_CODES)[number];

class SendVerificationEmailError extends Error {
    constructor(
        public readonly code: SendVerificationEmailErrorCode,
        public override readonly message: string
    ) {
        super(message);
    }
}

class BadRequestError extends SendVerificationEmailError {
    constructor(message = 'Bad Request') {
        super(400, message);
        this.name = 'BadRequestError';
    }
}

class UnauthorizedError extends SendVerificationEmailError {
    constructor(message = 'Unauthorized') {
        super(401, message);
        this.name = 'UnauthorizedError';
    }
}

class ForbiddenError extends SendVerificationEmailError {
    constructor(message = 'Forbidden') {
        super(403, message);
        this.name = 'ForbiddenError';
    }
}

class TooManyRequestsError extends SendVerificationEmailError {
    constructor(message = 'Too Many Requests') {
        super(429, message);
        this.name = 'TooManyRequestsError';
    }
}

const SEND_EMAIL_VERIFICATION_ERROR_MAP = {
    400: ['Bad Request', BadRequestError],
    401: ['Unauthorized', UnauthorizedError],
    403: ['Forbidden', ForbiddenError],
    429: ['Too Many Requests', TooManyRequestsError],
} as const;

export function handleSendVerificationEmailError(
    error: Error,
    response: Response
) {
    const [message, errorClass] =
        SEND_EMAIL_VERIFICATION_ERROR_MAP[
            response.status as keyof typeof SEND_EMAIL_VERIFICATION_ERROR_MAP
        ];
    if (errorClass) {
        throw new errorClass(error.message ?? message);
    }
    throw new SendVerificationEmailError(
        response.status as SendVerificationEmailErrorCode,
        error.message ?? 'Unknown Error'
    );
}
