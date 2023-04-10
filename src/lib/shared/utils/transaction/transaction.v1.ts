import * as z from 'zod';
import { ok, err } from 'neverthrow';

export interface TransactionStep<
    Title extends keyof Results,
    Context = Record<string, unknown>,
    Results = Record<string, unknown>
> {
    commit(
        context: Context,
        results: Results
    ): Promise<Results[Title]> | Results[Title];
    rollback(context: Context, results: Results): Promise<unknown> | unknown;
}

export type StepDefinition<
    ZO extends z.ZodType,
    Context = Record<string, unknown>
> = {
    [T in keyof z.infer<ZO>]: TransactionStep<T, Context, z.infer<ZO>>;
};

export type TransactionDefinition<
    Context = Record<string, unknown>,
    ZRS extends z.ZodRawShape = Record<string, z.ZodType>,
    ZO extends z.ZodObject<ZRS> = z.ZodObject<ZRS>
> = StepDefinition<ZO, Context>;

export type TransactionStepDefinition<
    T extends TransactionDefinition,
    K extends keyof T
> = T[K];

export async function executeTransaction<
    ZRS extends z.ZodRawShape = Record<string, z.ZodType>,
    ZO extends z.ZodObject<ZRS> = z.ZodObject<ZRS>,
    Context extends Record<string, unknown> = Record<string, unknown>
>(
    resultSchema: ZO,
    context: Context,
    steps: StepDefinition<ZO, Context>,
    debug = false
) {
    type TransactionSchema = z.infer<ZO>;
    let errorStep: [string, unknown] = ['none', null];
    const results = {} as TransactionSchema;
    const completedSteps: TransactionStep<string>[] = [];
    const allSteps = Object.entries(steps);
    for (const [stepTitle, step] of allSteps as Array<
        [keyof TransactionSchema, TransactionStep<string>]
    >) {
        debug && console.info(`Running step: ${stepTitle.toString()}`);
        try {
            const result = await step.commit(context, results);
            const parsedResult =
                resultSchema.shape[stepTitle as keyof ZRS].parse(result);
            results[stepTitle] = parsedResult;
            completedSteps.push(step);
        } catch (error) {
            debug && console.info('Encountered error on step', stepTitle);
            console.error(error);
            errorStep = [stepTitle.toString(), error];
            while (completedSteps.length)
                await completedSteps.pop()?.rollback(context, results);
            return err(errorStep);
        }
    }
    return ok(results);
}
