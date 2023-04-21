export class BaseError {
    public readonly name: string;
    public readonly message: string;
    public readonly stack?: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
