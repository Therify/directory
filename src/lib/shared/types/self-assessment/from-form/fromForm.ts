import {
    type SelfAssessment,
    schema as selfAssessmentSchema,
} from '../selfAssessment';
import { SelfAssessmentForm } from '../../forms/self-assessment';
import { processPHQ9 } from '../process-phq9';

export function fromForm(value: unknown): SelfAssessment {
    const formResponse = SelfAssessmentForm.validate(value);
    return selfAssessmentSchema.parse({
        concerns: formResponse.concerns,
        isCaregiver: formResponse.isCaregiver,
        hasSuicidalIdeation: formResponse.hasSuicidalIdeation,
        isInCrisis: formResponse.isInCrisis,
        isLGBTQ: formResponse.isLGBTQ,
        phq9Score: processPHQ9(formResponse),
        preferences: {
            lgbtq: {
                type: 'lgbtq',
                isRequired: formResponse.prefersLGBTQProvider,
            },
            ethnicity: {
                type: 'ethnic',
                selection: formResponse.ethnicPreference,
                isRequired: formResponse.isEthnicPreferenceDealbreaker,
            },
            gender: {
                type: 'gender',
                selection: formResponse.genderPreference,
                isRequired: formResponse.isGenderPreferenceDealbreaker,
            },
        },
    });
}
