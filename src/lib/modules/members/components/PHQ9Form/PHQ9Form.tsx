import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Paragraph } from '@/lib/shared/components/ui/Typography/Paragraph';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

export function PHQ9Form() {
    return (
        <PHQ9FormContainer spacing={4}>
            <Paragraph>
                Over the last 2 weeks, how often have you been bothered by any
                of the following problems?
            </Paragraph>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Little interest or pleasure in doing things
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Trouble falling or staying asleep, or sleeping too much
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Feeling down, depressed, or hopeless
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Feeling tired or having little energy
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Poor appetite or overeating
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Feeling bad about yourself – or that you are a failure or
                    have let yourself or your family down
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Trouble concentrating on things, such as reading the
                    newspaper or watching television
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Moving or speaking so slowly that other people could have
                    noticed? Or the opposite – being so fidgety or restless that
                    you have been moving around a lot more than usual
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    Thoughts that you would be better off dead or of hurting
                    yourself in some way
                </Paragraph>
                <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not at all"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={'Several days'}
                    />
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={'More than half the days'}
                    />
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={'Nearly every day'}
                    />
                </RadioGroup>
            </QuestionStack>
        </PHQ9FormContainer>
    );
}

const PHQ9FormContainer = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.paper,
    padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
}));
const QuestionStack = styled(Stack)(({ theme }) => ({}));
