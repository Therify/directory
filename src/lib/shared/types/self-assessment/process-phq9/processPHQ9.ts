import { SelfAssessmentForm } from '../../forms/self-assessment';

export function processPHQ9(value: unknown): number {
    const formResponse = SelfAssessmentForm.validate(value);
    return (
        formResponse.phq9Question1 +
        formResponse.phq9Question2 +
        formResponse.phq9Question3 +
        formResponse.phq9Question4 +
        formResponse.phq9Question5 +
        formResponse.phq9Question6 +
        formResponse.phq9Question7 +
        formResponse.phq9Question8 +
        formResponse.phq9Question9
    );
}
