import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { FormRenderer as Ui } from './FormRenderer';
import { z } from 'zod';

import { FormConfig } from './types';

export default {
    title: 'Ui/FormElements/FormRenderer',
    component: Ui,
    argTypes: {},
} as Meta;

const states = ['California', 'New York', 'Tennessee'] as const;
const schema = z
    .object({
        firstName: z.string().nonempty({
            message: 'First name is required.',
        }),
        lastName: z.string().nonempty({
            message: 'Last name is required.',
        }),
        age: z.number().min(18, {
            message: 'Must be at least 18 years old.',
        }),
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
        confirmPassword: z.string().nonempty({
            message: 'Confirm password is required.',
        }),
        state: z.enum(states),
        iAgree: z.literal(true),
        phoneNumber: z
            .string()
            .nonempty({
                message: 'Phone number is required.',
            })
            .min(10, {
                message: 'Phone number must be 10 digits.',
            })
            .max(10, {
                message: 'Phone number must be 10 digits.',
            }),
        description: z.string(),
        dateOfBirth: z.date().max(new Date(), {
            message: 'Date of birth must be in the past.',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

const containerStyle = {
    width: '100%',
    background: '#f5f5f5',
    padding: '16px',
};
const title = 'Config Driven Form';
const subtitle =
    'This form takes a configuration describing form fields and validation rules and scaffolds the config into a form ui.';

export const ConfigDrivenForm: StoryFn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const submit = (values: any) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Success!\n' + JSON.stringify(values, null, 2));
        }, 1000);
    };
    return (
        <div style={containerStyle}>
            <Ui
                validationSchema={schema}
                config={config}
                isSubmitting={isLoading}
                validationMode={'onChange'}
                onSubmit={submit}
            />
        </div>
    );
};

export const ErrorMessage: StoryFn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const submit = (values: any) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Success!\n' + JSON.stringify(values, null, 2));
        }, 1000);
    };
    return (
        <div style={containerStyle}>
            <Ui
                validationSchema={schema}
                config={config}
                validationMode={'onChange'}
                isSubmitting={isLoading}
                errorMessage="An error has occurred"
                onSubmit={submit}
            />
        </div>
    );
};
export const WithBackButton: StoryFn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const submit = (values: any) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Success!\n' + JSON.stringify(values, null, 2));
        }, 1000);
    };
    return (
        <div style={containerStyle}>
            <Ui
                validationSchema={schema}
                config={config}
                validationMode={'onChange'}
                isSubmitting={isLoading}
                onBack={() => console.log('back pressed')}
                submitButtonText="Next"
                onSubmit={submit}
            />
        </div>
    );
};
export const PrefilledForm: StoryFn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const submit = (values: any) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Success!\n' + JSON.stringify(values, null, 2));
        }, 1000);
    };
    return (
        <div style={containerStyle}>
            <Ui
                validationSchema={schema}
                config={config}
                defaultValues={{
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 25,
                    password: 'password',
                    confirmPassword: 'password',
                    description: 'I am a not a robot',
                    state: 'California',
                }}
                validationMode={'onChange'}
                isSubmitting={isLoading}
                onSubmit={submit}
            />
        </div>
    );
};
export const SubmittingForm: StoryFn = () => {
    return (
        <div style={containerStyle}>
            <Ui
                validationSchema={schema}
                config={config}
                defaultValues={{
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 25,
                    password: 'password',
                    confirmPassword: 'password',
                    description: 'I am a not a robot',
                    state: 'California',
                }}
                validationMode={'onChange'}
                isSubmitting
                onSubmit={console.log}
            />
        </div>
    );
};

const config: FormConfig<z.infer<typeof schema>> = {
    title,
    subtitle,
    sections: [
        {
            title: 'Section 1',
            fields: [
                {
                    type: 'input',
                    id: 'firstName',
                    inputType: 'text',
                    label: 'First Name',
                    helperText: 'Enter your first name',
                    placeholder: 'John',
                    statePath: 'firstName',
                    required: true,
                },
                {
                    type: 'input',
                    inputType: 'text',
                    id: 'lastName',
                    label: 'Last Name',
                    helperText: 'Enter your last name',
                    statePath: 'lastName',
                },
                {
                    id: 'password',
                    type: 'password',
                    label: 'Password',
                    helperText: 'Password must be 8 characters',
                    fullWidth: false,
                    statePath: 'password',
                    required: true,
                },
                {
                    id: 'confirmPassword',
                    type: 'password',
                    label: 'Confirm Password',
                    fullWidth: false,
                    statePath: 'confirmPassword',
                    required: true,
                },
                {
                    id: 'age',
                    type: 'input',
                    label: 'Age',
                    statePath: 'age',
                    inputType: 'number',
                },
                {
                    id: 'dateOfBirth',
                    type: 'date',
                    label: 'Date of Birth',
                    statePath: 'dateOfBirth',
                },
                {
                    id: 'phone',
                    type: 'telephone',
                    label: 'Phone Number',
                    statePath: 'phoneNumber',
                },
                {
                    id: 'description',
                    type: 'textarea',
                    label: "Tell us why you're here",
                    helperText: 'Do it',
                    fullWidth: true,
                    statePath: 'description',
                },
                {
                    id: 'state',
                    required: false,
                    type: 'select',
                    label: 'Select a state',
                    helperText: 'Select an option',
                    fullWidth: true,
                    statePath: 'state',
                    placeholder: 'select a state',
                    options: [...states],
                },
                {
                    id: 'iAgree',
                    type: 'toggle',
                    toggleType: 'switch',
                    fullWidth: true,
                    label: 'I agree to the terms and conditions',
                    statePath: 'iAgree',
                },
            ],
        },
    ],
};
