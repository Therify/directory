export { ROUTE as TRPC_ROUTE } from './trpc';
export { schema as inputSchema } from './input';
export type { Input } from './input';
export {
    schema as outputSchema,
    successSchema as outputSuccessSchema,
    failureSchema as outputFailureSchema,
    isValidSuccess as isValidOutputSuccess,
    isValidFailure as isValidOutputFailure,
} from './output';
export type { Output } from './output';
