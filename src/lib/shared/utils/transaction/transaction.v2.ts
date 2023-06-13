import { z } from 'zod';

export type TransactionStepDefinition<StepName, Input, Context, Result> = {
    commit: {
        (input: Input, context: Context, results: Result):
            | Promise<Result[StepName extends keyof Result ? StepName : never]>
            | Result[StepName extends keyof Result ? StepName : never];
    };
    rollback: {
        (input: Input, context: Context, results: Result): Promise<void>;
    };
};

export type TransactionDefinition<
    Input extends z.ZodType,
    Output extends { [key: string]: z.ZodType },
    Context,
    Result = {
        [StepName in keyof Output]: z.infer<
            Output[StepName] extends z.ZodType ? Output[StepName] : never
        >;
    }
> = {
    [StepName in keyof Output]: TransactionStepDefinition<
        StepName,
        z.infer<Input>,
        Context,
        Result
    >;
};

export function generateTransaction<
    InputSchema extends z.ZodType,
    Outputs extends { [StepName: string]: z.ZodType },
    Context extends Record<string, unknown>,
    Input = z.infer<InputSchema>,
    Result = {
        [StepName in keyof Outputs]: z.infer<
            Outputs[StepName] extends z.ZodType ? Outputs[StepName] : never
        >;
    },
    Transactions extends {
        [StepName in keyof Outputs]: TransactionStepDefinition<
            StepName,
            Input,
            Context,
            Result
        >;
    } = {
        [StepName in keyof Outputs]: TransactionStepDefinition<
            StepName,
            Input,
            Context,
            Result
        >;
    }
>({
    inputSchema,
    outputsSchema,
    context,
    transactions,
}: {
    inputSchema: InputSchema;
    outputsSchema: Outputs;
    context: Context;
    transactions: Transactions;
}) {
    return async function executeTransaction(
        input: Input
    ): Promise<Result | void> {
        const parsedInput = inputSchema.parse(input) as unknown as Input;
        const results: Result = {} as Result;
        const completedSteps: [
            string,
            TransactionStepDefinition<string, Input, Context, Result>
        ][] = [];
        for await (const stepName of Object.keys(transactions)) {
            const outputSchema = outputsSchema[stepName];
            const transaction = transactions[stepName];
            try {
                console.log(`[EXE-TRANSACTION|COMMIT]: ${stepName}`);
                const output = await transaction.commit(
                    parsedInput,
                    context,
                    results
                );
                const parsedOutput = outputSchema.parse(output);
                results[stepName as keyof Result] =
                    parsedOutput as Result[keyof Result];
                completedSteps.push([stepName, transaction]);
            } catch (error) {
                console.error(`[EXE-TRANSACTION|ERROR]: ${stepName}`, error);
                while (completedSteps.length) {
                    const completedStep = completedSteps.pop();
                    if (completedStep) {
                        const [stepName, transaction] = completedStep;
                        console.log(`[EXE-TRANSACTION|ROLLBACK]: ${stepName}`);
                        await transaction.rollback(
                            parsedInput,
                            context,
                            results
                        );
                    }
                }
                throw error;
            }
        }
        return results;
    };
}
