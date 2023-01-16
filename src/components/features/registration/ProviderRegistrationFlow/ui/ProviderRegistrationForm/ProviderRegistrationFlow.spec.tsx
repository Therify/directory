import { useForm } from 'react-hook-form';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterProvider } from '@/lib/features/registration';
import { renderWithTheme } from '@/components/fixtures';
import {
    ProviderRegistrationForm,
    ProviderRegistrationFormProps,
} from './ProviderRegistrationForm';
import { TEST_IDS } from './inputs/testIds';

describe('Provider Registration Form', function () {
    let mockForm: ReturnType<typeof useForm<RegisterProvider.Input>>;
    beforeEach(() => {
        user = userEvent.setup();
        const SetUpMockForm = () => {
            const form = useForm<RegisterProvider.Input>();
            mockForm = form;
            return <div />;
        };
        render(<SetUpMockForm />);
    });

    const email = 'test@test.com';
    const password = 'P@ssword1!';
    const givenName = 'Jonh';
    const surname = 'Wick';
    const dateOfBirth = '10101990';
    let user = userEvent.setup();
    const mockProps: Omit<ProviderRegistrationFormProps, 'control'> = {
        defaultValues: undefined,
        password,
        isEmailUnique: false,
        isEmailDisabled: false,
        emailHelperText: 'helper text',
    };

    it('renders', function () {
        expect(
            renderWithTheme(
                <ProviderRegistrationForm
                    {...mockProps}
                    control={mockForm.control}
                />
            )
        ).toBeDefined();
    });

    it('accepts form data', async () => {
        const { getByTestId, getByLabelText, container } = renderWithTheme(
            <ProviderRegistrationForm
                {...mockProps}
                control={mockForm.control}
            />
        );
        const firstNameInput = within(
            getByTestId(TEST_IDS.FIRST_NAME)
        ).getByRole('textbox');
        const lastNameInput = within(getByTestId(TEST_IDS.LAST_NAME)).getByRole(
            'textbox'
        );
        const emailInput = within(
            getByTestId(TEST_IDS.EMAIL_ADDRESS)
        ).getByRole('textbox');
        const passwordInput = getByTestId(TEST_IDS.PASSWORD).firstElementChild!;
        const confirmPasswordInput = getByTestId(TEST_IDS.CONFIRM_PASSWORD)
            .firstElementChild!;
        const dobInput = within(
            getByLabelText('Date of Birth *').parentElement!
        ).getByRole('textbox');
        const termsCheckbox = getByTestId(TEST_IDS.TERMS_AGREEMENT);

        await user.type(firstNameInput, givenName);
        await user.type(lastNameInput, surname);
        await user.type(emailInput, email);
        await user.type(passwordInput, password);
        await user.type(confirmPasswordInput, password);
        await user.type(dobInput, dateOfBirth);
        await user.click(termsCheckbox);
        const expectedRequest: RegisterProvider.Input = {
            emailAddress: email,
            givenName,
            surname,
            password,
            confirmPassword: password,
            dateOfBirth: new Date('10-10-1990').toISOString(),
            hasAcceptedTermsAndConditions: true,
        };
        expect(mockForm.getValues()).toEqual(expectedRequest);
    });
});
