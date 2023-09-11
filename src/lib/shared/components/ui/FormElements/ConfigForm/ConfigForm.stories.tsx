import { Meta, StoryFn } from '@storybook/react';
import { ConfigForm as Ui } from './ConfigForm';

import { FormConfig } from './types';
import { z } from 'zod';

export default {
    title: 'Ui/FormElements/ConfigDrivenForm',
    component: Ui,
    argTypes: {},
} as Meta;
const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    password: z.string(),
    confirmPassword: z.string(),
    state: z.string(),
    description: z.string(),
});
type StoryBookForm = z.infer<typeof schema>;

export const ConfigDrivenForm: StoryFn = () => {
    return (
        <Ui
            formSchema={schema}
            title="Config Driven Form"
            subTitle="This is a subtitle"
            config={config}
            validationMode={'onChange'}
            onSubmit={console.log}
        />
    );
};

const config: FormConfig<StoryBookForm> = {
    sections: [
        {
            title: 'Section 1',
            fields: [
                {
                    field: 'input',
                    label: 'First Name',
                    helperText: 'Enter your first name',
                    statePath: 'firstName',
                    required: true,
                    validation: {
                        required: 'Field is required',
                        minLength: {
                            value: 3,
                            message: 'Must be at least 3 characters',
                        },
                    },
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
                    validation: {
                        required: 'Field is required',
                        minLength: {
                            value: 8,
                            message: 'Must be at least 8 characters',
                        },
                    },
                },
                {
                    field: 'password',
                    label: 'Confirm Password',
                    fullWidth: false,
                    statePath: 'confirmPassword',
                    confirmationStatePath: 'password',
                    required: true,
                    validation: {
                        required: 'Field is required',
                    },
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
                    field: 'select',
                    label: 'Select a state',
                    helperText: 'Select an option',
                    fullWidth: true,
                    statePath: 'state',
                    options: ['California', 'New York', 'Tennessee'],
                },
            ],
        },
    ],
};
