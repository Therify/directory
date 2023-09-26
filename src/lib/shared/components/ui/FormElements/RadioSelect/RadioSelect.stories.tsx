import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { SelectOption } from '../Select';
import { RadioSelect as Component } from './RadioSelect';

const meta: Meta<typeof Component> = {
    title: 'Components/RadioSelect',
    component: Component,
};

export default meta;

const question =
    'In the 2 weeks have you had little interest or pleasure in doing things?';
const options: SelectOption[] = [
    {
        id: 'not-at-all',
        displayText: 'Not at all',
        value: 'not-at-all',
    },
    {
        id: 'several-days',
        displayText: 'Several days',
        value: 'several-days',
    },
    {
        id: 'more-than-half-the-days',
        displayText: 'More than half the days',
        value: 'more-than-half-the-days',
    },
    {
        id: 'nearly-every-day',
        displayText: 'Nearly every day',
        value: 'nearly-every-day',
    },
];

export const RadioSelect: StoryFn<typeof Component> = () => {
    const [value, setValue] = useState<string>();
    return (
        <Component
            id="radio-select"
            label={question}
            value={value}
            onChange={(value) => setValue(value)}
            options={options}
        />
    );
};
export const Disabled: StoryFn<typeof Component> = () => {
    const [value, setValue] = useState<string>();
    return (
        <Component
            id="radio-select"
            label={question}
            value={value}
            onChange={(value) => setValue(value)}
            options={options}
            disabled
        />
    );
};
