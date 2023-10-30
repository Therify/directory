import { renderWithTheme } from '@/lib/shared/components/fixtures';
import userEvent from '@testing-library/user-event';
import { DeepPartial } from 'react-hook-form';
import { NotificationsForm } from './NotificationsForm';
import { NotificationsForm as NotificationsFormType } from '../form';

describe('NotificationsForm', () => {
    const user = userEvent.setup();
    const newMessagesLabel = 'New messages';
    const matchProgressLabel = 'Match progress';
    const emailNotificationsLabel = 'Turn on/off email notifications';
    const saveButtonText = 'Save changes';
    const mockDefaults: DeepPartial<NotificationsFormType> = {
        isEmailNotificationsOn: true,
        email: {
            newMessages: true,
            matchProgress: true,
        },
    };
    it('should turn on all email notifications', async () => {
        const mockOnSubmit = jest.fn();
        const defaultValues: DeepPartial<NotificationsFormType> = {
            isEmailNotificationsOn: false,
            email: {
                newMessages: false,
                matchProgress: false,
            },
        };
        const { getByLabelText, queryByLabelText, getByText } = renderWithTheme(
            <NotificationsForm
                onSubmit={mockOnSubmit}
                defaultValues={defaultValues}
            />
        );
        const emailNotificationsSwitch = getByLabelText(
            emailNotificationsLabel
        );
        expect(emailNotificationsSwitch).not.toBeChecked();
        expect(queryByLabelText(newMessagesLabel)).not.toBeInTheDocument();
        expect(queryByLabelText(matchProgressLabel)).not.toBeInTheDocument();
        await user.click(emailNotificationsSwitch);
        expect(emailNotificationsSwitch).toBeChecked();
        expect(getByLabelText(newMessagesLabel)).toBeChecked();
        expect(getByLabelText(matchProgressLabel)).toBeChecked();

        const submitButton = getByText(saveButtonText);
        await user.click(submitButton);
        const formData = mockOnSubmit.mock.calls[0][0];
        expect(formData).toEqual(mockDefaults);
    });

    it('should turn off all email notifications', async () => {
        const mockOnSubmit = jest.fn();
        const { getByLabelText, queryByLabelText, getByText } = renderWithTheme(
            <NotificationsForm
                onSubmit={mockOnSubmit}
                defaultValues={mockDefaults}
            />
        );
        const emailNotificationsSwitch = getByLabelText(
            emailNotificationsLabel
        );
        await user.click(emailNotificationsSwitch);
        expect(emailNotificationsSwitch).not.toBeChecked();
        expect(queryByLabelText(newMessagesLabel)).not.toBeInTheDocument();
        expect(queryByLabelText(matchProgressLabel)).not.toBeInTheDocument();

        const submitButton = getByText(saveButtonText);
        await user.click(submitButton);
        const formData = mockOnSubmit.mock.calls[0][0];
        expect(formData).toEqual({
            isEmailNotificationsOn: false,
            email: {
                newMessages: false,
                matchProgress: false,
            },
        });
    });

    it('should default to all inputs on', async () => {
        const mockOnSubmit = jest.fn();
        const { getByLabelText } = renderWithTheme(
            <NotificationsForm onSubmit={mockOnSubmit} />
        );
        expect(getByLabelText(emailNotificationsLabel)).toBeChecked();
        expect(getByLabelText(newMessagesLabel)).toBeChecked();
        expect(getByLabelText(matchProgressLabel)).toBeChecked();
    });

    it('should handle default values', async () => {
        const mockOnSubmit = jest.fn();
        const defaultValues: DeepPartial<NotificationsFormType> = {
            isEmailNotificationsOn: true,
            email: {
                newMessages: false,
                matchProgress: true,
            },
        };
        const { getByLabelText } = renderWithTheme(
            <NotificationsForm
                onSubmit={mockOnSubmit}
                defaultValues={defaultValues}
            />
        );
        const emailNotificationsSwitch = getByLabelText(
            emailNotificationsLabel
        );
        const newMessagesCheckbox = getByLabelText(newMessagesLabel);
        const matchProgressCheckbox = getByLabelText(matchProgressLabel);
        expect(emailNotificationsSwitch).toBeChecked();
        expect(newMessagesCheckbox).not.toBeChecked();
        expect(matchProgressCheckbox).toBeChecked();
    });

    it('should turn off only new messages email notifications', async () => {
        const mockOnSubmit = jest.fn();
        const defaultValues: DeepPartial<NotificationsFormType> = {
            isEmailNotificationsOn: true,
            email: {
                newMessages: true,
                matchProgress: true,
            },
        };
        const { getByLabelText, getByText } = renderWithTheme(
            <NotificationsForm
                onSubmit={mockOnSubmit}
                defaultValues={defaultValues}
            />
        );
        const newMessagesCheckbox = getByLabelText(newMessagesLabel);
        const submitButton = getByText(saveButtonText);
        await user.click(newMessagesCheckbox);
        await user.click(submitButton);
        expect(newMessagesCheckbox).not.toBeChecked();
        expect(mockOnSubmit).toHaveBeenCalled();
        const formData = mockOnSubmit.mock.calls[0][0];
        expect(formData).toEqual({
            ...defaultValues,
            email: {
                ...defaultValues.email,
                newMessages: false,
            },
        });
    });
    it('should turn off only match progress email notifications', async () => {
        const mockOnSubmit = jest.fn();
        const defaultValues: DeepPartial<NotificationsFormType> = {
            isEmailNotificationsOn: true,
            email: {
                newMessages: true,
                matchProgress: true,
            },
        };
        const { getByLabelText, getByText } = renderWithTheme(
            <NotificationsForm
                onSubmit={mockOnSubmit}
                defaultValues={defaultValues}
            />
        );
        const matchProgressCheckbox = getByLabelText(matchProgressLabel);
        const submitButton = getByText(saveButtonText);
        await user.click(matchProgressCheckbox);
        await user.click(submitButton);
        expect(matchProgressCheckbox).not.toBeChecked();
        expect(mockOnSubmit).toHaveBeenCalled();
        const formData = mockOnSubmit.mock.calls[0][0];
        expect(formData).toEqual({
            ...defaultValues,
            email: {
                ...defaultValues.email,
                matchProgress: false,
            },
        });
    });
});
