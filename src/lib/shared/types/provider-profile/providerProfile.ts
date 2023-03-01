import * as z from 'zod';
import * as Pronoun from '../pronoun';
import { ProviderProfileSchema } from '../../schema';
import { ProviderCredential } from '../provider-credential';
import { ProviderSupervisor } from '../provider-supervisor';
import { AcceptedInsurance } from '../accepted-insurance';
import { convertNestedDatesToISOString } from '../../utils';

export const schema = ProviderProfileSchema.extend({
    pronouns: Pronoun.schema,
    credentials: ProviderCredential.schema.array(),
    acceptedInsurances: AcceptedInsurance.schema.array(),
    supervisor: ProviderSupervisor.schema.nullable(),
    id: z.string().optional(),
    practiceStartDate: z
        .unknown()
        .nullable()
        .transform((value) => {
            // if is Date, return as string
            if (value instanceof Date) return value.toISOString();
            // if is string, return as string
            if (typeof value === 'string') return value;
            // if is null, return null
            if (value === null) return null;
        }),
}).omit({
    createdAt: true,
    updatedAt: true,
});

export type ProviderProfile = z.infer<typeof schema>;

export const validate = (value: unknown): ProviderProfile => {
    const valueWithISOStringDates = convertNestedDatesToISOString(value);
    if (
        valueWithISOStringDates !== null &&
        typeof valueWithISOStringDates === 'object' &&
        'supervisor' in valueWithISOStringDates
    ) {
        const supervisorShouldBeNull =
            valueWithISOStringDates.supervisor === null ||
            JSON.stringify(valueWithISOStringDates.supervisor) === '{}';
        return schema.parse({
            ...valueWithISOStringDates,
            supervisor: supervisorShouldBeNull
                ? null
                : valueWithISOStringDates.supervisor,
        });
    }
    return schema.parse(valueWithISOStringDates);
};

export const isValid = (value: unknown): value is ProviderProfile => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
