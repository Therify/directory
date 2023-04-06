import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Paragraph } from '@/lib/shared/components/ui/Typography/Paragraph';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import React from 'react';

function usePHQ9Form() {
    const [question1, setQuestion1] = React.useState(0);
    const [question2, setQuestion2] = React.useState(0);
    const [question3, setQuestion3] = React.useState(0);
    const [question4, setQuestion4] = React.useState(0);
    const [question5, setQuestion5] = React.useState(0);
    const [question6, setQuestion6] = React.useState(0);
    const [question7, setQuestion7] = React.useState(0);
    const [question8, setQuestion8] = React.useState(0);
    const [question9, setQuestion9] = React.useState(0);
    const score = React.useMemo(
        () =>
            question1 +
            question2 +
            question3 +
            question4 +
            question5 +
            question6 +
            question7 +
            question8 +
            question9,
        [
            question1,
            question2,
            question3,
            question4,
            question5,
            question6,
            question7,
            question8,
            question9,
        ]
    );
    return {
        question1,
        setQuestion1,
        question2,
        setQuestion2,
        question3,
        setQuestion3,
        question4,
        setQuestion4,
        question5,
        setQuestion5,
        question6,
        setQuestion6,
        question7,
        setQuestion7,
        question8,
        setQuestion8,
        question9,
        setQuestion9,
        score,
    };
}
interface PHQ9FormProps {
    onUpdated?: (score: number) => void;
}

export function PHQ9Form({ onUpdated }: PHQ9FormProps) {
    const {
        question1,
        setQuestion1,
        question2,
        setQuestion2,
        question3,
        setQuestion3,
        question4,
        setQuestion4,
        question5,
        setQuestion5,
        question6,
        setQuestion6,
        question7,
        setQuestion7,
        question8,
        setQuestion8,
        question9,
        setQuestion9,
        score,
    } = usePHQ9Form();
    return (
        <PHQ9FormContainer spacing={4}>
            <Paragraph>
                Over the last 2 weeks, how often have you been bothered by any
                of the following problems?
            </Paragraph>
            <QuestionStack>
                <Paragraph sx={{ fontWeight: 'bold' }}>
                    1. Little interest or pleasure in doing things
                </Paragraph>
                <RadioGroup
                    defaultValue={question1}
                    value={question1}
                    onChange={(e) => {
                        setQuestion1(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <FormControlLabel control={<Radio />} label="Not at all" />
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
                    2. Trouble falling or staying asleep, or sleeping too much
                </Paragraph>
                <RadioGroup
                    value={question2}
                    onChange={(e) => {
                        setQuestion2(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                    3. Feeling down, depressed, or hopeless
                </Paragraph>
                <RadioGroup
                    value={question3}
                    onChange={(e) => {
                        setQuestion3(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                    4. Feeling tired or having little energy
                </Paragraph>
                <RadioGroup
                    value={question4}
                    onChange={(e) => {
                        setQuestion4(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                    5. Poor appetite or overeating
                </Paragraph>
                <RadioGroup
                    value={question5}
                    onChange={(e) => {
                        setQuestion5(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                    6. Feeling bad about yourself – or that you are a failure or
                    have let yourself or your family down
                </Paragraph>
                <RadioGroup
                    value={question6}
                    onChange={(e) => {
                        setQuestion6(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                    7. Trouble concentrating on things, such as reading the
                    newspaper or watching television
                </Paragraph>
                <RadioGroup
                    value={question7}
                    onChange={(e) => {
                        setQuestion7(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                    8. Moving or speaking so slowly that other people could have
                    noticed? Or the opposite – being so fidgety or restless that
                    you have been moving around a lot more than usual
                </Paragraph>
                <RadioGroup
                    value={question8}
                    onChange={(e) => {
                        setQuestion8(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                    9. Thoughts that you would be better off dead or of hurting
                    yourself in some way
                </Paragraph>
                <RadioGroup
                    value={question9}
                    onChange={(e) => {
                        setQuestion9(Number(e.target.value));
                        onUpdated?.(score);
                    }}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
