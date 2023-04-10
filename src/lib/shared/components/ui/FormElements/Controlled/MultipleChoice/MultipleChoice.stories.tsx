import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Meta, StoryFn } from '@storybook/react';
import {
    type MultipleChoiceProps,
    ControlledMultipleChoice as Component,
} from './MultipleChoice';

const meta: Meta<typeof Component> = {
    title: 'FormElements/Controlled/RadioGroup',
    component: Component,
};

export default meta;

const schema = z.object({
    levelOfInterest: z.number().int().min(1).max(5),
});

export const ControlledRadioGroup: StoryFn<typeof Component> = (args) => {
    const { control, watch } = useForm({
        resolver: zodResolver(schema),
    });
    watch(console.log);
    const choices = [
        { label: '1', value: 1, sx: { color: 'white' } },
        { label: '2', value: 2, sx: { color: 'white' } },
        { label: '3', value: 3, sx: { color: 'white' } },
    ];
    return (
        <Component
            choices={choices}
            label="Level of interest"
            defaultChecked
            defaultValue={1}
            type="number"
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
            labelProps={{
                sx: {
                    color: 'white',
                },
            }}
            controllerProps={{
                name: 'levelOfInterest',
                control,
            }}
        />
    );
};
