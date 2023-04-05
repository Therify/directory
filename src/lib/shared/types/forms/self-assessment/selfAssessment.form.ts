import * as z from 'zod';
import { Ethnicity } from '../../ethnicity';
import { Gender } from '../../gender';
import { Issue } from '../../issues';
import { Language } from '../../language';
import {
    EthnicPreference,
    GenderPreference,
} from '../../self-assessment/preferences';

export const schema = z.object({
    ethnicPreference: z.enum(EthnicPreference.ENTRIES).default("Don't care"),
    isEthnicPreferenceDealbreaker: z.boolean().default(false),
    genderPreference: z.enum(GenderPreference.ENTRIES).default("Don't care"),
    isGenderPreferenceDealbreaker: z.boolean().default(false),
    languagePreference: z.enum(Language.ENTRIES).default('English'),
    concerns: z.enum(Issue.ENTRIES).array().default([]),
    isLGBTQ: z.boolean().default(false),
    prefersLGBTQProvider: z.boolean().default(false),
    isCaregiver: z.boolean().default(false),
    prefersTherapistIsCaregiver: z.boolean().default(false),
    isInCrisis: z.boolean().default(false),
    hasSuicidalIdeation: z.boolean().default(false),
    phq9Question1: z.number().min(0).max(3).default(0),
    phq9Question2: z.number().min(0).max(3).default(0),
    phq9Question3: z.number().min(0).max(3).default(0),
    phq9Question4: z.number().min(0).max(3).default(0),
    phq9Question5: z.number().min(0).max(3).default(0),
    phq9Question6: z.number().min(0).max(3).default(0),
    phq9Question7: z.number().min(0).max(3).default(0),
    phq9Question8: z.number().min(0).max(3).default(0),
    phq9Question9: z.number().min(0).max(3).default(0),
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

export const DEFAULT_VALUES: Type = {
    ethnicPreference: "Don't care",
    isEthnicPreferenceDealbreaker: false,
    genderPreference: "Don't care",
    isGenderPreferenceDealbreaker: false,
    languagePreference: 'English',
    concerns: [],
    isLGBTQ: false,
    prefersLGBTQProvider: false,
    isCaregiver: false,
    prefersTherapistIsCaregiver: false,
    isInCrisis: false,
    hasSuicidalIdeation: false,
    phq9Question1: 0,
    phq9Question2: 0,
    phq9Question3: 0,
    phq9Question4: 0,
    phq9Question5: 0,
    phq9Question6: 0,
    phq9Question7: 0,
    phq9Question8: 0,
    phq9Question9: 0,
};
