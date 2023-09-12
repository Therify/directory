import { sleep } from '@/lib/shared/utils';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { use } from 'react';
import { z } from 'zod';
import { renderWithTheme } from '../../../fixtures';
import { TEST_IDS as SELECT_TEST_IDS } from '../Select';
import { ConfigForm, TEST_IDS } from './ConfigForm';
import {
    FormConfig,
    FormField,
    PasswordInput,
    SelectInput,
    TextAreaInput,
} from './types';

// const useForm = jest.fn();
// jest.mock('react-hook-form', () => ({
//     useForm,
// }));

const getMockInputConfig = (fields: FormField | FormField[]): FormConfig => ({
    sections: [
        {
            title: 'Section 1',
            fields: Array.isArray(fields) ? fields : [fields],
        },
    ],
});

describe('ConfigForm', () => {
    const user = userEvent.setup();
    const mockConfig: FormConfig = {
        sections: [],
    };
    describe('form', () => {
        it('renders form title', () => {
            const title = 'Config Driven Form';
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title={title}
                    config={mockConfig}
                    validationMode={'onChange'}
                    onSubmit={(values) => console.log('submit', values)}
                />
            );

            expect(getByText(title)).toBeVisible();
        });

        it('renders subtitle', () => {
            const subtitle = 'subtitle';
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title="title"
                    subTitle={subtitle}
                    config={mockConfig}
                    validationMode={'onChange'}
                    onSubmit={(values) => console.log('submit', values)}
                />
            );

            expect(getByText(subtitle)).toBeVisible();
        });

        it('renders section title', () => {
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title="title"
                    config={{
                        sections: [
                            {
                                title: 'Section 1',
                                fields: [],
                            },
                        ],
                    }}
                    validationMode={'onChange'}
                    onSubmit={(values) => console.log('submit', values)}
                />
            );

            expect(getByText('Section 1')).toBeVisible();
        });

        it('displays error message', async () => {
            const errorMessage = 'This is an error message';
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title="title"
                    config={mockConfig}
                    validationMode={'onChange'}
                    onSubmit={console.log}
                    errorMessage={errorMessage}
                />
            );
            // Allow entrance transition to complete
            await sleep(400);
            expect(getByText(errorMessage)).toBeVisible();
        });

        it('prefills form with default values', async () => {
            const { getByDisplayValue } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({
                        firstName: z.string(),
                    })}
                    title="title"
                    config={getMockInputConfig({
                        field: 'input',
                        label: 'First Name',
                        placeholder: 'First Name',
                        statePath: 'firstName',
                        type: 'text',
                    })}
                    defaultValues={{
                        firstName: 'John',
                    }}
                    validationMode={'onChange'}
                    onSubmit={jest.fn()}
                />
            );

            expect(getByDisplayValue('John')).toBeVisible();
        });
    });

    describe('buttons', () => {
        it('renders submit button text', () => {
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title="title"
                    config={mockConfig}
                    validationMode={'onChange'}
                    onSubmit={console.log}
                    submitButtonText="Next"
                />
            );
            expect(getByText('Next')).toBeVisible();
        });

        it('renders back button when click handler provided', () => {
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title="title"
                    config={mockConfig}
                    validationMode={'onChange'}
                    onSubmit={console.log}
                    onBack={console.log}
                />
            );
            expect(getByText('Back')).toBeVisible();
        });

        it('renders back button text', () => {
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title="title"
                    config={mockConfig}
                    validationMode={'onChange'}
                    onSubmit={console.log}
                    backButtonText="Back"
                    onBack={console.log}
                />
            );
            expect(getByText('Back')).toBeVisible();
        });

        it('calls onBack when back button is clicked', async () => {
            const onBack = jest.fn();
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({})}
                    title="title"
                    config={mockConfig}
                    validationMode={'onChange'}
                    onSubmit={console.log}
                    backButtonText="Back"
                    onBack={onBack}
                />
            );
            const backButton = getByText('Back');
            await user.click(backButton);

            expect(onBack).toHaveBeenCalled();
        });

        it('calls onSubmit when submit button is clicked', async () => {
            const onSubmit = jest.fn();
            const { getByText, getByPlaceholderText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({
                        firstName: z.string(),
                    })}
                    title="title"
                    config={getMockInputConfig({
                        field: 'input',
                        label: 'First Name',
                        placeholder: 'First Name',
                        statePath: 'firstName',
                        type: 'text',
                    })}
                    defaultValues={{
                        firstName: 'John',
                    }}
                    validationMode={'onChange'}
                    onSubmit={onSubmit}
                />
            );
            // Allow prefill validation to complete and re-render
            await sleep(0);
            const button = getByText('Submit');
            await user.click(button);

            expect(onSubmit).toHaveBeenCalled();
        });

        it('disables submit button when submitting', async () => {
            const onSubmit = jest.fn();
            const { getByTestId } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({
                        firstName: z.string(),
                    })}
                    title="title"
                    config={getMockInputConfig({
                        field: 'input',
                        label: 'First Name',
                        placeholder: 'First Name',
                        statePath: 'firstName',
                        type: 'text',
                    })}
                    defaultValues={{
                        firstName: 'John',
                    }}
                    validationMode={'onChange'}
                    onSubmit={onSubmit}
                    isSubmitting
                />
            );
            const button = getByTestId(TEST_IDS.SUBMIT_BUTTON);

            expect(button).toBeDisabled();
        });
    });

    describe('input field', () => {
        const mockSchema = z.object({
            firstName: z.string().nonempty({
                message: 'First name is required.',
            }),
        });
        it('renders input', () => {
            const mockInputConfig = getMockInputConfig({
                field: 'input',
                label: 'First Name',
                helperText: 'Enter your first name',
                statePath: 'firstName',
            });
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockInputConfig}
                    validationMode={'onChange'}
                    onSubmit={(values) => console.log('submit', values)}
                />
            );
            const inputDetails = mockInputConfig.sections[0].fields[0];
            expect(getByText(inputDetails.label)).toBeVisible();
            expect(getByText(inputDetails.helperText!)).toBeVisible();
        });
        it('captures text input', async () => {
            const mockSubmit = jest.fn();
            const mockInputConfig = getMockInputConfig({
                field: 'input',
                label: 'First Name',
                placeholder: 'First Name',
                helperText: 'Enter your first name',
                statePath: 'firstName',
                type: 'text',
            });
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({
                        firstName: z.string().nonempty({
                            message: 'First name is required.',
                        }),
                    })}
                    title="title"
                    config={mockInputConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const input = getByPlaceholderText('First Name');
            const submitButton = getByText('Submit');
            await user.type(input, 'John');
            expect(input).toHaveValue('John');
            await user.click(submitButton);
            expect(mockSubmit).toHaveBeenCalledWith({ firstName: 'John' });
        });

        it('captures number input', async () => {
            const mockSubmit = jest.fn();
            const mockInputConfig = getMockInputConfig({
                field: 'input',
                label: 'Age',
                placeholder: 'Age',
                statePath: 'age',
                type: 'number',
            });
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({
                        age: z.number(),
                    })}
                    title="title"
                    config={mockInputConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const input = getByPlaceholderText('Age');
            const submitButton = getByText('Submit');
            await user.type(input, '1');
            expect(input).toHaveValue(1);
            await user.click(submitButton);
            expect(mockSubmit).toHaveBeenCalledWith({ age: 1 });
        });

        it('captures email input', async () => {
            const mockSubmit = jest.fn();
            const mockInputConfig = getMockInputConfig({
                field: 'input',
                label: 'Email',
                placeholder: 'Email',
                statePath: 'email',
                type: 'email',
            });
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({
                        email: z.string(),
                    })}
                    title="title"
                    config={mockInputConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const emailAddress = 'test@therify.co';
            const input = getByPlaceholderText('Email');
            const submitButton = getByText('Submit');
            expect(input).toHaveProperty('type', 'email');
            await user.type(input, emailAddress);
            expect(input).toHaveValue(emailAddress);
            await user.click(submitButton);
            expect(mockSubmit).toHaveBeenCalledWith({
                email: emailAddress,
            });
        });

        it('validates input', async () => {
            const mockSubmit = jest.fn();
            const mockInputConfig = getMockInputConfig({
                field: 'input',
                label: 'Age',
                placeholder: 'Age',
                statePath: 'age',
                type: 'number',
            });
            const errorMessage = 'Age must be greater than 18';
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={z.object({
                        age: z.number().min(18, {
                            message: errorMessage,
                        }),
                    })}
                    title="title"
                    config={mockInputConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const input = getByPlaceholderText('Age');
            const submitButton = getByText('Submit');
            await user.type(input, '17');
            expect(input).toHaveValue(17);
            expect(getByText(errorMessage)).toBeVisible();
            expect(submitButton).toBeDisabled();
        });
    });

    describe('password field', () => {
        const errorMessage = 'Password must be at least 8 characters.';
        const mockSchema = z.object({
            password: z.string().nonempty().min(8, {
                message: errorMessage,
            }),
        });
        const mockPasswordConfig = getMockInputConfig({
            field: 'password',
            label: 'Password',
            placeholder: 'Password',
            helperText: 'Enter your password',
            statePath: 'password',
        });
        const inputDetails = mockPasswordConfig.sections[0]
            .fields[0] as PasswordInput;
        it('renders password input', () => {
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockPasswordConfig}
                    validationMode={'onChange'}
                    onSubmit={console.log}
                />
            );
            expect(getByText(inputDetails.label)).toBeVisible();
            expect(getByText(inputDetails.helperText!)).toBeVisible();
        });

        it('captures password input', async () => {
            const mockSubmit = jest.fn();
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockPasswordConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const password = '12345678';
            const input = getByPlaceholderText(inputDetails.placeholder!);
            const submitButton = getByText('Submit');
            await user.type(input, password);
            expect(input).toHaveValue(password);
            await user.click(submitButton);
            expect(mockSubmit).toHaveBeenCalledWith({ password });
        });

        it('validates password input', async () => {
            const mockSubmit = jest.fn();
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockPasswordConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const password = '123';
            const input = getByPlaceholderText(inputDetails.placeholder!);
            const submitButton = getByText('Submit');
            await user.type(input, password);
            expect(input).toHaveValue(password);
            expect(getByText(errorMessage)).toBeVisible();
            expect(submitButton).toBeDisabled();
        });
    });

    describe('textarea field', () => {
        const errorMessage = 'Description is required.';
        const mockSchema = z.object({
            description: z.string().nonempty({
                message: errorMessage,
            }),
        });
        const mockTextareaConfig = getMockInputConfig({
            field: 'textarea',
            label: 'Tell us more',
            placeholder: 'placeholder',
            helperText: 'Helper text',
            statePath: 'description',
        });

        const textAreaDetails = mockTextareaConfig.sections[0]
            .fields[0] as TextAreaInput;
        it('renders textarea', () => {
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockTextareaConfig}
                    validationMode={'onChange'}
                    onSubmit={(values) => console.log('submit', values)}
                />
            );
            expect(getByText(textAreaDetails.label)).toBeVisible();
            expect(getByText(textAreaDetails.helperText!)).toBeVisible();
        });

        it('captures textarea input', async () => {
            const mockSubmit = jest.fn();
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockTextareaConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const description = 'This is a description';
            const input = getByPlaceholderText(textAreaDetails.placeholder!);
            const submitButton = getByText('Submit');
            await user.type(input, description);
            expect(input).toHaveValue(description);
            await user.click(submitButton);
            expect(mockSubmit).toHaveBeenCalledWith({ description });
        });

        it('validates textarea', async () => {
            const mockSubmit = jest.fn();
            const { getByPlaceholderText, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockTextareaConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const input = getByPlaceholderText(textAreaDetails.placeholder!);
            const submitButton = getByText('Submit');
            await user.type(input, '1');
            await user.type(input, '{backspace}');
            fireEvent.blur(input);
            expect(getByText(errorMessage)).toBeVisible();
            expect(submitButton).toBeDisabled();
        });
    });

    describe('select field', () => {
        const mockSchema = z.object({
            yesOrNo: z.enum(['Yes', 'No']),
        });
        const selectConfig: SelectInput = {
            id: 'yesOrNo',
            field: 'select',
            label: 'Select yes or no',
            helperText: 'Helper text',
            statePath: 'yesOrNo',
            options: ['Yes', 'No'],
        };
        const mockSelectConfig = getMockInputConfig(selectConfig);
        const selectDetails = mockSelectConfig.sections[0]
            .fields[0] as SelectInput;

        it('renders select', () => {
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockSelectConfig}
                    validationMode={'onChange'}
                    onSubmit={console.log}
                />
            );
            expect(getByText(selectDetails.label)).toBeVisible();
            expect(getByText(selectDetails.helperText!)).toBeVisible();
        });

        it('captures select', async () => {
            const mockSubmit = jest.fn();
            const { getByTestId, getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockSelectConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const select = getByTestId(
                SELECT_TEST_IDS.SELECT
            ).firstElementChild;
            const submitButton = getByText('Submit');
            await userEvent.click(select!);
            const optionEl = getByTestId(
                `${SELECT_TEST_IDS.SELECT_MENU_ITEM}-${'Yes'}`
            );
            await userEvent.click(optionEl);
            await user.click(submitButton);
            expect(mockSubmit).toHaveBeenCalledWith({ yesOrNo: 'Yes' });
        });

        it('requires selection to submit', async () => {
            const mockSubmit = jest.fn();
            const { getByText } = renderWithTheme(
                <ConfigForm
                    formSchema={mockSchema}
                    title="title"
                    config={mockSelectConfig}
                    validationMode={'onChange'}
                    onSubmit={mockSubmit}
                />
            );
            const submitButton = getByText('Submit');
            expect(submitButton).toBeDisabled();
        });
    });
});
