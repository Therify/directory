import { TransactionV2 } from '@/lib/shared/utils';
import {
    TRANSACTION_STEPS,
    createAuth0User,
    createTherifyUserEntity,
    INPUT_SCHEMA,
    OUTPUT_SCHEMA,
    CONTEXT,
    assignAuth0Role,
} from './transaction';

export const registerMember = TransactionV2.generateTransaction<
    typeof INPUT_SCHEMA,
    typeof OUTPUT_SCHEMA,
    typeof CONTEXT
>({
    inputSchema: INPUT_SCHEMA,
    outputsSchema: OUTPUT_SCHEMA,
    transactions: {
        [TRANSACTION_STEPS.CREATE_AUTH0_USER]: createAuth0User,
        [TRANSACTION_STEPS.ASSIGN_AUTH0_ROLE]: assignAuth0Role,
        [TRANSACTION_STEPS.CREATE_THERIFY_USER_ENTRY]: createTherifyUserEntity,
    },
    context: CONTEXT,
});
