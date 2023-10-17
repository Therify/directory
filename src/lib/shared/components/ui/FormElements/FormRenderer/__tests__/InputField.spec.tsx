import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { Input } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';

describe('Input field', () => {
    const user = userEvent.setup();
    const mockSchema = z.object({
        firstName: z.string().nonempty({
            message: 'First name is required.',
        }),
    });
    it('renders input', () => {
        const mockInputConfig = getMockInputConfig({
            id: 'test',
            type: 'input',
            label: 'First Name',
            helperText: 'Enter your first name',
            statePath: 'firstName',
            inputType: 'text',
        });
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockInputConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        const inputDetails = mockInputConfig.sections[0].fields[0];
        expect(getByText(inputDetails.label)).toBeVisible();
        expect(getByText(inputDetails.helperText!)).toBeVisible();
    });
    it('captures text input', async () => {
        const mockSubmit = jest.fn();
        const mockInputConfig = getMockInputConfig({
            id: 'test',
            type: 'input',
            label: 'First Name',
            placeholder: 'First Name',
            helperText: 'Enter your first name',
            statePath: 'firstName',
            inputType: 'text',
        });
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({
                    firstName: z.string().nonempty({
                        message: 'First name is required.',
                    }),
                })}
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
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({ firstName: 'John' });
    });

    it('captures number input', async () => {
        const mockSubmit = jest.fn();
        const mockInputConfig = getMockInputConfig({
            id: 'test',
            type: 'input',
            label: 'Age',
            placeholder: 'Age',
            statePath: 'age',
            inputType: 'number',
        });
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({
                    age: z.number(),
                })}
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
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({ age: 1 });
    });

    it('captures email input', async () => {
        const mockSubmit = jest.fn();
        const mockInputConfig = getMockInputConfig({
            id: 'test',
            type: 'input',
            label: 'Email',
            placeholder: 'Email',
            statePath: 'email',
            inputType: 'email',
        });
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({
                    email: z.string(),
                })}
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
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({
            email: emailAddress,
        });
    });
    it('captures tel input', async () => {
        const mockSubmit = jest.fn();
        const mockInputConfig = getMockInputConfig({
            id: 'test',
            type: 'input',
            label: 'Phone Number',
            placeholder: 'Phone',
            statePath: 'phone',
            inputType: 'tel',
        });
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({
                    phone: z.string(),
                })}
                config={mockInputConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const phone = '1231231234';
        const input = getByPlaceholderText('Phone');
        const submitButton = getByText('Submit');
        expect(input).toHaveProperty('type', 'tel');
        await user.type(input, phone);
        expect(input).toHaveValue(phone);
        await user.click(submitButton);
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({
            phone,
        });
    });

    it('cleans non-numeric values from tel input', async () => {
        const mockSubmit = jest.fn();
        const mockInputConfig = getMockInputConfig({
            id: 'test',
            type: 'input',
            label: 'Phone Number',
            placeholder: 'Phone',
            statePath: 'phone',
            inputType: 'tel',
        });
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({
                    phone: z.string(),
                })}
                config={mockInputConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const phone = '1a2b3c1d2e3f1g2h3i4j';
        const expectedPhone = '1231231234';
        const input = getByPlaceholderText('Phone');
        const submitButton = getByText('Submit');
        await user.type(input, phone);
        expect(input).toHaveValue(expectedPhone);
        await user.click(submitButton);
        const dataArg = mockSubmit.mock.calls[0][0];
        expect(dataArg).toEqual({
            phone: expectedPhone,
        });
    });

    it('validates string input', async () => {
        const mockSubmit = jest.fn();
        const mockInputConfig = getMockInputConfig({
            type: 'input',
            id: 'test',
            label: 'Name',
            placeholder: 'Name',
            statePath: 'name',
            inputType: 'text',
        });
        const errorMessage = 'Cannot be empty';
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({
                    name: z.string().nonempty({
                        message: errorMessage,
                    }),
                })}
                config={mockInputConfig}
                validationMode={'onChange'}
                onSubmit={mockSubmit}
            />
        );
        const input = getByPlaceholderText('Name');
        const submitButton = getByText('Submit');
        await user.type(input, 'T');
        await user.type(input, '{backspace}');
        fireEvent.blur(input);
        expect(getByText(errorMessage)).toBeVisible();
        expect(submitButton).toBeDisabled();
    });
    it('validates number input', async () => {
        const mockSubmit = jest.fn();
        const mockInputConfig = getMockInputConfig({
            type: 'input',
            id: 'test',
            label: 'Age',
            placeholder: 'Age',
            statePath: 'age',
            inputType: 'number',
        });
        const errorMessage = 'Age must be greater than 18';
        const { getByPlaceholderText, getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({
                    age: z.number().min(18, {
                        message: errorMessage,
                    }),
                })}
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

    it('disables field when form is submitting', () => {
        const mockInputConfig = getMockInputConfig({
            id: 'test',
            type: 'input',
            inputType: 'text',
            label: 'First Name',
            helperText: 'Enter your first name',
            placeholder: 'John',
            statePath: 'firstName',
        });
        const { getByPlaceholderText } = renderWithTheme(
            <FormRenderer
                isSubmitting
                validationSchema={mockSchema}
                config={mockInputConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );
        const inputDetails = mockInputConfig.sections[0].fields[0];
        expect(
            getByPlaceholderText(
                (inputDetails as Input<z.infer<typeof mockSchema>>).placeholder!
            )
        ).toBeDisabled();
    });
});
