import * as z from 'zod';
import { schema as insuranceProviderSchema } from '../insuranceProvider';
import { MemberProfileSchema } from '../../schema';
import { Country } from '../address';
import { validate as validateState } from '../address/united-states/state';
import { validate as validateProvince } from '../address/canada/province';
import { Issue } from '../issues';
import { Goal } from '../goals';

export const schema = MemberProfileSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).transform(({ concerns, country, insurance, goals, state, ...rest }) => {
    return {
        ...rest,
        concerns: concerns.map(Issue.validate),
        country: Country.validate(country),
        insurance: insuranceProviderSchema.parse(insurance),
        goals: goals.map(Goal.validate),
        state:
            country === Country.MAP.UNITED_STATES
                ? validateState(state)
                : validateProvince(state),
    };
});

export type Type = z.infer<typeof schema>;

export const validate = (value: unknown): Type => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
