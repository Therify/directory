export class UnknownFormError extends Error {
    constructor(formId: string) {
        super(`Unknown Jotform form id: ${formId}`);
    }
}
