export const OK = 200;
export const CREATED = 201;
export const ACCEPTED = 202;
export const NO_CONTENT = 204;
export const MOVED_PERMANENTLY = 301;
export const FOUND = 302;
export const SEE_OTHER = 303;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;
export const SERVICE_UNAVAILABLE = 503;

export type StatusCode =
    | typeof OK
    | typeof CREATED
    | typeof ACCEPTED
    | typeof NO_CONTENT
    | typeof MOVED_PERMANENTLY
    | typeof FOUND
    | typeof SEE_OTHER
    | typeof BAD_REQUEST
    | typeof UNAUTHORIZED
    | typeof NOT_FOUND
    | typeof INTERNAL_SERVER_ERROR
    | typeof SERVICE_UNAVAILABLE;

/**
 * Http status code map
 */
export const STATUS_MESSAGE_MAP: Record<StatusCode, string> = {
    [OK]: 'OK',
    [CREATED]: 'Created',
    [ACCEPTED]: 'Accepted',
    [NO_CONTENT]: 'No Content',
    [MOVED_PERMANENTLY]: 'Moved Permanently',
    [FOUND]: 'Found',
    [SEE_OTHER]: 'See Other',
    [BAD_REQUEST]: 'Bad Request',
    [UNAUTHORIZED]: 'Unauthorized',
    [NOT_FOUND]: 'Not Found',
    [INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [SERVICE_UNAVAILABLE]: 'Service Unavailable',
};

/**
 *
 * @param statusCode - Http status code
 * @returns Http status message
 */
export function getStatusMessage(statusCode: StatusCode): string {
    return STATUS_MESSAGE_MAP[statusCode];
}
