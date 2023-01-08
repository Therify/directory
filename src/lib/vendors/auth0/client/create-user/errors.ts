import { Response } from 'node-fetch';

export class UserAlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}

export class InsufficientPermissionsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InsufficientPermissionsError';
    }
}

export class BadRequest extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequest';
    }
}

export function handleCreateUserError(error: Error, response: Response): void {
    if (response.status === 409) {
        throw new UserAlreadyExistsError(error.message);
    }
    if (response.status === 403) {
        throw new InsufficientPermissionsError(error.message);
    }
    if (response.status === 400) {
        throw new BadRequest(error.message);
    }
    throw error;
}
