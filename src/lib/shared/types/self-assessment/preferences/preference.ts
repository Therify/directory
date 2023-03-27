import * as EthnicPreference from './ethnicPreference';
import * as GenderPreference from './genderPreference';
import * as LGBTQPreference from './lgbtqPreference';

import * as z from 'zod';

export const schema = z.object({
    gender: GenderPreference.schema,
    ethnicity: EthnicPreference.schema,
    lgbtq: LGBTQPreference.schema,
});

export type Preference = z.infer<typeof schema>;

export const validate = (value: unknown): Preference => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Preference => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};

/**
 *
 */
export const DEFAULT: Preference = {
    gender: {
        type: 'gender',
        selection: null,
        isRequired: false,
    },
    ethnicity: {
        type: 'ethnic',
        selection: null,
        isRequired: false,
    },
    lgbtq: {
        type: 'lgbtq',
        isRequired: false,
    },
};
