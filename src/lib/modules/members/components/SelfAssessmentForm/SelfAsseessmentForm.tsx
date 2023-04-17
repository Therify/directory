import { Button, Divider } from '@/lib/shared/components/ui';
import { H4 } from '@/lib/shared/components/ui/Typography/Headers';
import { Paragraph } from '@/lib/shared/components/ui/Typography/Paragraph';
import { Issue, Language } from '@/lib/shared/types';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelfAssessmentForm as SelfAssessmentFormSchema } from '@/lib/shared/types/forms/self-assessment';
import { ControlledMultipleChoice } from '@/lib/shared/components/ui/FormElements/Controlled/MultipleChoice';
import { ControlledSelectGrid } from '@/lib/shared/components/ui/FormElements/Controlled/SelectGrid/SelectGrid';
import { DealBreaker } from '@/lib/shared/components/ui/FormElements/Controlled/DealBreaker';
import {
    EthnicPreference,
    GenderPreference,
} from '@/lib/shared/types/self-assessment/preferences';
import { ControlledSelect } from '@/lib/shared/components/ui/FormElements/Controlled/Select';
import { YesNo } from '@/lib/shared/components/ui/FormElements/Controlled/YesNo';

interface SelfAssessmentFormProps {
    onSubmit?: (data: SelfAssessmentFormSchema.Type) => void;
}

const PHQ9Options = [
    { label: 'Not at all', value: 0, controlLabelProps: undefined },
    { label: 'Several days', value: 1, controlLabelProps: undefined },
    {
        label: 'More than half the days',
        value: 2,
        controlLabelProps: undefined,
    },
    { label: 'Nearly every day', value: 3, controlLabelProps: undefined },
] as const;
const PHQ9Questions = [
    '1. Little interest or pleasure in doing things',
    '2. Feeling down, depressed, or hopeless',
    '3. Trouble falling or staying asleep, or sleeping too much',
    '4. Feeling tired or having little energy',
    '5. Poor appetite or overeating',
    '6. Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
    '7. Trouble concentrating on things, such as reading the newspaper or watching television',
    '8. Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
    '9. Thoughts that you would be better off dead, or of hurting yourself in some way',
] as const;

export function SelfAssessmentForm({
    onSubmit = console.log,
}: SelfAssessmentFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: SelfAssessmentFormSchema.DEFAULT_VALUES,
        resolver: zodResolver(SelfAssessmentFormSchema.schema),
    });
    return (
        <SelfAssessmentContainer>
            <>
                <AssessmentSection>
                    <SectionHeader>
                        <H4>Tell us about your concerns</H4>
                        <Paragraph>
                            Select any number of concerns relevant to you.
                        </Paragraph>
                    </SectionHeader>
                    <ControlledSelectGrid
                        controllerProps={{ name: 'concerns', control }}
                        options={Issue.ENTRIES}
                        error={errors.concerns}
                    />
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                        }}
                        spacing={8}
                    >
                        <DealBreaker
                            label="Provider Ethnicity"
                            controllerProps={{
                                name: 'ethnicPreference',
                                control,
                            }}
                            dealBreakerName={'isEthnicPreferenceDealbreaker'}
                            options={Array.from(EthnicPreference.ENTRIES)}
                            predicateFn={(value) => value !== "Don't care"}
                            errors={errors.ethnicPreference}
                            selectProps={{
                                wrapperSx: {
                                    minWidth: {
                                        xs: '100%',
                                        sm: '200px',
                                    },
                                },
                                sx: {
                                    minWidth: {
                                        xs: '100%',
                                        sm: '200px',
                                    },
                                },
                            }}
                        />
                        <DealBreaker
                            label="Provider Gender"
                            controllerProps={{
                                name: 'genderPreference',
                                control,
                            }}
                            dealBreakerName={'isGenderPreferenceDealbreaker'}
                            options={Array.from(GenderPreference.ENTRIES)}
                            errors={errors.genderPreference}
                            predicateFn={(value) => value !== "Don't care"}
                            selectProps={{
                                wrapperSx: {
                                    minWidth: {
                                        xs: '100%',
                                        sm: '200px',
                                    },
                                },
                                sx: {
                                    minWidth: {
                                        xs: '100%',
                                        sm: '200px',
                                    },
                                },
                            }}
                        />
                        <ControlledSelect
                            label="Provider Language"
                            controllerProps={{
                                name: 'languagePreference',
                                control,
                            }}
                            errors={errors.languagePreference}
                            options={Array.from(Language.ENTRIES)}
                            selectProps={{
                                wrapperSx: {
                                    minWidth: {
                                        xs: '100%',
                                        sm: '200px',
                                    },
                                },
                                sx: {
                                    minWidth: {
                                        xs: '100%',
                                        sm: '200px',
                                    },
                                },
                            }}
                        />
                    </Stack>
                    <YesNo
                        label="Do you identify with the LGBTQ+ community?"
                        controllerProps={{ name: 'isLGBTQ', control }}
                    />
                    <YesNo
                        label="Is it important to you that your provider identifies with the LGBTQ+ community?"
                        controllerProps={{
                            name: 'prefersLGBTQProvider',
                            control,
                        }}
                    />
                    <YesNo
                        label="Do you identify as a parent or caregiver?"
                        controllerProps={{ name: 'isCaregiver', control }}
                    />
                    <YesNo
                        label="Is it important to you that your provider identifies as a parent or caregiver?"
                        controllerProps={{
                            name: 'prefersTherapistIsCaregiver',
                            control,
                        }}
                    />
                    <YesNo
                        label="Are you experiencing an emergency or crisis?"
                        controllerProps={{ name: 'isInCrisis', control }}
                    />
                    <YesNo
                        label="Are you experiencing suicidal thoughts or desires?"
                        controllerProps={{
                            name: 'hasSuicidalIdeation',

                            control,
                        }}
                    />
                    <Divider />
                    <Paragraph bold>
                        Over the last 2 weeks, how often have you been bothered
                        by any of the following problems?
                    </Paragraph>
                    {PHQ9Questions.map((question, index) => {
                        const questionName = `phq9Question${
                            index + 1
                        }` as keyof typeof SelfAssessmentFormSchema.DEFAULT_VALUES;
                        return (
                            <ControlledMultipleChoice
                                key={question}
                                label={question}
                                errors={errors[questionName]}
                                controllerProps={{
                                    name: questionName,
                                    control,
                                }}
                                defaultValue={0}
                                type="number"
                                defaultChecked
                                // @ts-ignore
                                choices={PHQ9Options}
                            />
                        );
                    })}
                </AssessmentSection>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </>
        </SelfAssessmentContainer>
    );
}

const SelfAssessmentContainer = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.paper,
    padding: `${theme.spacing(8)} ${theme.spacing(4)}`,
}));

const AssessmentSection = styled(Stack)(({ theme }) => ({
    paddingBottom: theme.spacing(16),
    gap: theme.spacing(4),
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2),
}));
