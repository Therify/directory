import { Divider } from '@/lib/shared/components/ui';
import { Button } from '@/lib/shared/components/ui/Button';
import { InputWrapper } from '@/lib/shared/components/ui/FormElements/Input/InputWrapper';
import { Select } from '@/lib/shared/components/ui/FormElements/Select';
import { H4 } from '@/lib/shared/components/ui/Typography/Headers';
import { Paragraph } from '@/lib/shared/components/ui/Typography/Paragraph';
import {
    Ethnicity,
    Gender,
    InsuranceProvider,
    Issue,
    Language,
} from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React from 'react';
import { PHQ9Form } from '../PHQ9Form/PHQ9Form';

type EthnicityOptions = Ethnicity.Ethnicity & "Don't Care";
type GenderOptions = Omit<Gender.Gender, 'Prefer not to say'> & "Don't Care";
type LanguageOptions = Language.Language;
type InsuranceOptions = InsuranceProvider.InsuranceProvider;

const ETHNICITY_OPTIONS = [
    ...Ethnicity.ENTRIES,
    "Don't Care",
] as EthnicityOptions[];

const GENDER_OPTIONS = [
    ...Gender.ENTRIES.filter((g) => g !== 'Prefer not to say'),
    "Don't Care",
] as GenderOptions[];

const LANGUAGE_OPTIONS = Language.ENTRIES as unknown as LanguageOptions[];

const INSURANCE_OPTIONS = [...InsuranceProvider.ENTRIES] as InsuranceOptions[];

export interface SelfAssessmentFormResults {
    concerns: Issue.Issue[];
    providerEthnicity: EthnicityOptions;
    providerGender: GenderOptions;
    providerLanguage: LanguageOptions;
    providerInsurance: InsuranceOptions;
    identifiesAsLGBTQ: boolean;
    identifiesAsCaregiver: boolean;
    providerIdentifiesAsLGBTQ: boolean;
    providerIdentifiesAsCaregiver: boolean;
    isExperiencingCrisis: boolean;
    isExperiencingSuicidalThoughts: boolean;
    phq9Score: number;
}

function useSelfAssessmentForm() {
    const [concerns, setConcerns] = React.useState<Issue.Issue[]>([]);
    const isConcernSelected = (issue: Issue.Issue) => {
        return concerns.includes(issue);
    };
    const selectConcern = (issue: Issue.Issue) => {
        if (isConcernSelected(issue)) {
            setConcerns(concerns.filter((c) => c !== issue));
        } else {
            setConcerns([...concerns, issue]);
        }
    };
    const [providerEthnicity, setProviderEthnicity] =
        React.useState<Ethnicity.Ethnicity>('American Indian');
    const [providerGender, setProviderGender] =
        React.useState<Gender.Gender>('Female');
    const [providerLanguage, setProviderLanguage] =
        React.useState<Language.Language>('English');
    const [providerInsurance, setProviderInsurance] =
        React.useState<InsuranceProvider.InsuranceProvider>('Aetna');
    const [identifiesAsLGBTQ, setIdentifiesAsLGBTQ] = React.useState(false);
    const [identifiesAsCaregiver, setIdentifiesAsCaregiver] =
        React.useState(false);
    const [providerIdentifiesAsLGBTQ, setProviderIdentifiesAsLGBTQ] =
        React.useState(false);
    const [providerIdentifiesAsCaregiver, setProviderIdentifiesAsCaregiver] =
        React.useState(false);
    const [isExperiencingCrisis, setIsExperiencingCrisis] =
        React.useState(false);
    const [isExperiencingSuicidalThoughts, setIsExperiencingSuicidalThoughts] =
        React.useState(false);
    const [phq9Score, setPhq9Score] = React.useState(0);

    return {
        concerns,
        isConcernSelected,
        setConcerns,
        selectConcern,
        providerEthnicity,
        setProviderEthnicity,
        providerGender,
        setProviderGender,
        providerLanguage,
        setProviderLanguage,
        providerInsurance,
        setProviderInsurance,
        identifiesAsLGBTQ,
        setIdentifiesAsLGBTQ,
        identifiesAsCaregiver,
        setIdentifiesAsCaregiver,
        providerIdentifiesAsLGBTQ,
        setProviderIdentifiesAsLGBTQ,
        providerIdentifiesAsCaregiver,
        setProviderIdentifiesAsCaregiver,
        isExperiencingCrisis,
        setIsExperiencingCrisis,
        isExperiencingSuicidalThoughts,
        setIsExperiencingSuicidalThoughts,
        phq9Score,
        setPhq9Score,
    };
}

export function SelfAssessmentForm() {
    const {
        concerns,
        isConcernSelected,
        selectConcern,
        providerEthnicity,
        setProviderEthnicity,
        providerGender,
        setProviderGender,
        providerLanguage,
        setProviderLanguage,
        providerInsurance,
        setProviderInsurance,
        identifiesAsLGBTQ,
        setIdentifiesAsLGBTQ,
        identifiesAsCaregiver,
        setIdentifiesAsCaregiver,
        providerIdentifiesAsLGBTQ,
        setProviderIdentifiesAsLGBTQ,
        providerIdentifiesAsCaregiver,
        setProviderIdentifiesAsCaregiver,
        isExperiencingCrisis,
        setIsExperiencingCrisis,
        isExperiencingSuicidalThoughts,
        setIsExperiencingSuicidalThoughts,
        phq9Score,
        setPhq9Score,
    } = useSelfAssessmentForm();
    return (
        <SelfAssessmentContainer>
            <AssessmentSection>
                <SectionHeader>
                    <H4>Tell us about your concerns</H4>
                    <Paragraph>
                        Select any number of concerns relevant to you.
                    </Paragraph>
                </SectionHeader>
                <section>
                    <IssueList>
                        {Issue.ENTRIES.map((issue) => {
                            return (
                                <IssueButton
                                    key={issue}
                                    onClick={() => selectConcern(issue)}
                                    selected={isConcernSelected(issue)}
                                >
                                    {issue}
                                </IssueButton>
                            );
                        })}
                    </IssueList>
                </section>
            </AssessmentSection>
            <AssessmentSection>
                <SectionHeader>
                    <H4>Who would you like to connect with?</H4>
                    <Paragraph>
                        Our provider represent all backgrounds and identities.
                    </Paragraph>
                </SectionHeader>
                <Stack
                    spacing={4}
                    direction={{
                        xs: 'column',
                        sm: 'row',
                    }}
                >
                    <InputWrapper label="Provider Ethnicity">
                        <Select
                            id="Provider Ethnicity"
                            sx={{ minWidth: { lg: 300, xs: '100%' } }}
                            value={providerEthnicity}
                            onChange={(value) =>
                                setProviderEthnicity(value as EthnicityOptions)
                            }
                            options={asSelectOptions(ETHNICITY_OPTIONS)}
                        />
                    </InputWrapper>
                    <InputWrapper label="Provider Gender">
                        <Select
                            id="Provider Gender"
                            sx={{ minWidth: { lg: 300, xs: '100%' } }}
                            value={providerGender}
                            onChange={(value) =>
                                setProviderGender(value as GenderOptions)
                            }
                            options={asSelectOptions(GENDER_OPTIONS)}
                        />
                    </InputWrapper>
                    <InputWrapper label="Provider Language">
                        <Select
                            id="Provider Language"
                            sx={{ minWidth: { lg: 300, xs: '100%' } }}
                            value={providerLanguage}
                            onChange={(value) =>
                                setProviderLanguage(value as LanguageOptions)
                            }
                            options={asSelectOptions(LANGUAGE_OPTIONS)}
                        />
                    </InputWrapper>
                    <InputWrapper label="Provider Insurance">
                        <Select
                            id="Provider Insurance"
                            sx={{ minWidth: { lg: 300, xs: '100%' } }}
                            value={providerInsurance}
                            onChange={(value) =>
                                setProviderInsurance(value as InsuranceOptions)
                            }
                            options={asSelectOptions(INSURANCE_OPTIONS)}
                        />
                    </InputWrapper>
                </Stack>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Do you identify as LGBTQ?</FormLabel>
                        <RadioGroup
                            defaultValue={'no'}
                            value={identifiesAsLGBTQ ? 'yes' : 'no'}
                            onChange={(event) => {
                                setIdentifiesAsLGBTQ(
                                    event.target.value === 'yes'
                                );
                            }}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Is it important that your provider identify with the
                            LGBTQ+ community?
                        </FormLabel>
                        <RadioGroup
                            defaultValue={'no'}
                            value={providerIdentifiesAsLGBTQ ? 'yes' : 'no'}
                            onChange={(event) => {
                                setProviderIdentifiesAsLGBTQ(
                                    event.target.value === 'yes'
                                );
                            }}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Do you identify as a parent or caregiver?
                        </FormLabel>
                        <RadioGroup
                            defaultValue={'no'}
                            value={identifiesAsCaregiver ? 'yes' : 'no'}
                            onChange={(event) => {
                                setIdentifiesAsCaregiver(
                                    event.target.value === 'yes'
                                );
                            }}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            It is important that your provider have experience
                            working with parents or caregivers?
                        </FormLabel>
                        <RadioGroup
                            defaultValue={'no'}
                            value={providerIdentifiesAsCaregiver ? 'yes' : 'no'}
                            onChange={(event) => {
                                setProviderIdentifiesAsCaregiver(
                                    event.target.value === 'yes'
                                );
                            }}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Are you experiencing an emergency or crisis?
                        </FormLabel>
                        <RadioGroup
                            defaultValue={'no'}
                            value={isExperiencingCrisis ? 'yes' : 'no'}
                            onChange={(event) => {
                                setIsExperiencingCrisis(
                                    event.target.value === 'yes'
                                );
                            }}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Are you experiencing suicidal thoughts or desires?
                        </FormLabel>
                        <RadioGroup
                            defaultValue={'no'}
                            value={
                                isExperiencingSuicidalThoughts ? 'yes' : 'no'
                            }
                            onChange={(event) => {
                                setIsExperiencingSuicidalThoughts(
                                    event.target.value === 'yes'
                                );
                            }}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <PHQ9Form
                        onUpdated={(phq9) => {
                            setPhq9Score(phq9);
                        }}
                    />
                    <Box>
                        <Button>Submit and see matches</Button>
                    </Box>
                </Stack>
            </AssessmentSection>
        </SelfAssessmentContainer>
    );
}

const SelfAssessmentContainer = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.paper,
    padding: `${theme.spacing(8)} ${theme.spacing(4)}`,
}));

const AssessmentSection = styled(Stack)(({ theme }) => ({
    paddingBottom: theme.spacing(16),
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2),
}));

const IssueList = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: theme.spacing(4),
    },
}));

const IssueButton = styled(Box)<{ selected: boolean }>(
    ({ theme, selected }) => ({
        border: `2px solid ${theme.palette.secondary.dark}`,
        color: theme.palette.secondary.dark,
        padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
        height: 77,
        maxHeight: 77,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            background: theme.palette.secondary.light,
            cursor: 'pointer',
        },
        ...(selected && {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText,
        }),
    })
);

const YesNoQuestion = styled(Stack)(({ theme }) => ({}));
