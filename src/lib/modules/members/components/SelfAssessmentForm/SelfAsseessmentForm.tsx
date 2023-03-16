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

export function SelfAssessment() {
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
                                <IssueButton key={issue}>{issue}</IssueButton>
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
                            value="American Indian"
                            options={asSelectOptions(Ethnicity.ENTRIES)}
                        />
                    </InputWrapper>
                    <InputWrapper label="Provider Gender">
                        <Select
                            id="Provider Gender"
                            sx={{ minWidth: { lg: 300, xs: '100%' } }}
                            value="Male"
                            options={asSelectOptions(Gender.ENTRIES)}
                        />
                    </InputWrapper>
                    <InputWrapper label="Provider Language">
                        <Select
                            id="Provider Language"
                            sx={{ minWidth: { lg: 300, xs: '100%' } }}
                            value="English"
                            options={asSelectOptions(Language.ENTRIES)}
                        />
                    </InputWrapper>
                    <InputWrapper label="Provider Insurance">
                        <Select
                            id="Provider Insurance"
                            sx={{ minWidth: { lg: 300, xs: '100%' } }}
                            value="Aetna"
                            options={asSelectOptions(InsuranceProvider.ENTRIES)}
                        />
                    </InputWrapper>
                </Stack>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Do you identify as LGBTQ?</FormLabel>
                        <RadioGroup defaultValue={'no'}>
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
                        <RadioGroup defaultValue={'no'}>
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
                        <RadioGroup defaultValue={'no'}>
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
                        <RadioGroup defaultValue={'no'}>
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
                        <RadioGroup defaultValue={'no'}>
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
                        <RadioGroup defaultValue={'no'}>
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
    padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
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

const IssueButton = styled(Box)(({ theme }) => ({
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
}));

const YesNoQuestion = styled(Stack)(({ theme }) => ({}));
