import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { FormRenderer } from '../FormRenderer';
import { PasswordInput } from '../types';
import { renderWithTheme } from '../../../../fixtures';
import { getMockInputConfig } from '../__mocks__/getMockInputConfig';

describe('Password field', () => {
    const user = userEvent.setup();
    const errorMessage = 'Password must be at least 8 characters.';
    const mockSchema = z.object({
        password: z.string().nonempty().min(8, {
            message: errorMessage,
        }),
    });
    const mockPasswordConfig = getMockInputConfig({
        id: 'test',
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        helperText: 'Enter your password',
        statePath: 'password',
    });
    const inputDetails = mockPasswordConfig.sections[0]
        .fields[0] as PasswordInput<z.infer<typeof mockSchema>>;
    it('renders password input', () => {
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
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
            <FormRenderer
                validationSchema={mockSchema}
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
            <FormRenderer
                validationSchema={mockSchema}
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

    it('disables field when form is submitting', () => {
        const { getByPlaceholderText } = renderWithTheme(
            <FormRenderer
                validationSchema={mockSchema}
                config={mockPasswordConfig}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
                isSubmitting
            />
        );
        const input = getByPlaceholderText(inputDetails.placeholder!);
        expect(input).toBeDisabled();
    });
});
