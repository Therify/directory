import { Meta, StoryFn } from '@storybook/react';
import { ConfigForm as Ui } from './ConfigForm';

import { FormConfig } from './types';
import { z } from 'zod';

export default {
    title: 'Ui/FormElements/ConfigDrivenForm',
    component: Ui,
    argTypes: {},
} as Meta;
const states = ['California', 'New York', 'Tennessee'] as const;
const schema = z.object({
    firstName: z.string().nonempty({
        message: 'First name is required.',
    }),
    lastName: z.string().nonempty({
        message: 'Last name is required.',
    }),
    age: z.number().min(18, {
        message: 'Must be at least 18 years old.',
    }),
    password: z.string(),
    confirmPassword: z.string(),
    state: z.enum(states).optional(),
    description: z.string(),
});

export const ConfigDrivenForm: StoryFn = () => {
    return (
        <Ui
            formSchema={schema}
            title="Config Driven Form"
            subTitle="This is a subtitle"
            config={config}
            validationMode={'onChange'}
            onSubmit={(values) => console.log('submit', values)}
        />
    );
};

const config: FormConfig = {
    sections: [
        {
            title: 'Section 1',
            fields: [
                {
                    field: 'input',
                    label: 'First Name',
                    helperText: 'Enter your first name',
                    placeholder: 'John',
                    statePath: 'firstName',
                    required: true,
                },
                {
                    field: 'input',
                    label: 'Last Name',
                    helperText: 'Enter your last name',
                    statePath: 'lastName',
                },
                {
                    field: 'input',
                    label: 'Age',
                    statePath: 'age',
                    type: 'number',
                },
                {
                    field: 'password',
                    label: 'Password',
                    helperText: 'Password must be 8 characters',
                    fullWidth: false,
                    statePath: 'password',
                    required: true,
                },
                {
                    field: 'password',
                    label: 'Confirm Password',
                    fullWidth: false,
                    statePath: 'confirmPassword',
                    required: true,
                },
                {
                    field: 'textarea',
                    label: "Tell us why you're here",
                    helperText: 'Do it',
                    fullWidth: true,
                    statePath: 'description',
                },
                {
                    id: 'state',
                    required: false,
                    field: 'select',
                    label: 'Select a state',
                    helperText: 'Select an option',
                    fullWidth: true,
                    statePath: 'state',
                    placeholder: 'select a state',
                    options: states as unknown as string[],
                },
            ],
        },
    ],
};
