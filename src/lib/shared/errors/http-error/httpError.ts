import { BaseError } from '../base-error';
import {
    getStatusMessage,
    type StatusCode,
} from '../../status-codes/statusCodes';
/**
 * HttpError
 * @class
 * @extends BaseError
 * @param {number} status - Http status code
 * @param {string} message - Error message
 * @param {boolean} isOperational - Is operational error
 */
export class HttpError extends BaseError {
    public readonly status: number;
    public readonly isOperational: boolean;
    constructor(status: StatusCode, message?: string, isOperational?: boolean) {
        super('HTTPError', message || getStatusMessage(status));
        this.status = status;
        this.isOperational = isOperational || true;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    toJSON() {
        return {
            status: this.status,
            message: this.message,
            isOperational: this.isOperational,
        };
    }
}
