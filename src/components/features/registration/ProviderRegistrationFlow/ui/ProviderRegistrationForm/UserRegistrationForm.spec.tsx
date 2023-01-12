import { fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { Request as RegisterMemberRequest } from '@therify/features/registration/schema';
import {
    createDateValidationErrorMessages, createNameValidationErrorMessages, DateValidationType,
    emailValidationErrorMessages, EmailValidationType, NameValidationType,
    passwordValidationErrorMessages, PasswordValidationType
} from '@therify/errors';
import { renderWithTheme } from '@therify/ui/core';

import { TEST_IDS } from './inputs/testIds';
import { UserRegistrationForm, UserRegistrationFormProps } from './UserRegistrationForm';

describe('Registration Form', function () {
    // const mockProps: UserRegistrationFormProps = {
    //     control:
    // };
    const email = 'test@test.com';
    const password = 'P@ssword1!';
    const givenName = 'Jonh';
    const surname = 'Wick';
    const dateOfBirth = '10101990';
    let user = userEvent.setup();

    beforeEach(() => {
        user = userEvent.setup();
        // (mockProps.onSubmit as jest.Mock).mockReset();
    });

    it.skip('renders', function () {
        // const result = renderWithTheme(<UserRegistrationForm {...mockProps} />);
        // expect(result).toBeDefined();
    });

    // it('submits registration form', async () => {
    //     const { getByTestId, getByLabelText } = renderWithTheme(
    //         <UserRegistrationForm {...mockProps} />
    //     );
    //     const firstNameInput = within(
    //         getByTestId(TEST_IDS.FIRST_NAME)
    //     ).getByRole('textbox');
    //     const lastNameInput = within(getByTestId(TEST_IDS.LAST_NAME)).getByRole(
    //         'textbox'
    //     );
    //     const emailInput = within(
    //         getByTestId(TEST_IDS.EMAIL_ADDRESS)
    //     ).getByRole('textbox');
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const passwordInput = getByTestId(TEST_IDS.PASSWORD).firstElementChild!;
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const confirmPasswordInput = getByTestId(TEST_IDS.CONFIRM_PASSWORD)
    //         .firstElementChild!;
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const dobInput = within(
    //         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //         getByLabelText('Date of Birth *').parentElement!
    //     ).getByRole('textbox');
    //     const termsCheckbox = getByTestId(TEST_IDS.TERMS_AGREEMENT);

    //     const submitButton = getByTestId(TEST_IDS.SUBMIT_BUTTON);
    //     await user.type(firstNameInput, givenName);
    //     await user.type(lastNameInput, surname);
    //     await user.type(emailInput, email);
    //     await user.type(passwordInput, password);
    //     await user.type(dobInput, dateOfBirth);
    //     await user.click(termsCheckbox);
    //     await user.type(confirmPasswordInput, password);
    //     [emailInput, passwordInput, confirmPasswordInput, dobInput].forEach(
    //         (input) => fireEvent.blur(input)
    //     );
    //     expect(submitButton).toBeEnabled();
    //     await user.click(submitButton);
    //     const expectedRequest: RegisterMemberRequest.Request = {
    //         emailAddress: email,
    //         givenName,
    //         surname,
    //         password,
    //         confirmPassword: password,
    //         dateOfBirth: new Date('10-10-1990').toISOString(),
    //         hasAcceptedTermsAndConditions: true,
    //         company:
    //             mockProps.company as RegisterMemberRequest.Request['company'],
    //     };
    //     expect(mockProps.onSubmit).toHaveBeenCalledWith(expectedRequest);
    // });
    // it('catches invalid first name input', async () => {
    //     const { getByTestId, getByText } = renderWithTheme(
    //         <UserRegistrationForm {...mockProps} />
    //     );
    //     const firstNameInput = within(
    //         getByTestId(TEST_IDS.FIRST_NAME)
    //     ).getByRole('textbox');
    //     const submitButton = getByTestId(TEST_IDS.SUBMIT_BUTTON);
    //     await user.type(firstNameInput, 'b{backspace}');
    //     fireEvent.blur(firstNameInput);
    //     expect(submitButton).toBeDisabled();
    //     expect(
    //         getByText(
    //             createNameValidationErrorMessages('First Name')[
    //                 NameValidationType.Required
    //             ]
    //         )
    //     ).toBeVisible();
    // });
    // it('catches invalid last name input', async () => {
    //     const { getByTestId, getByText } = renderWithTheme(
    //         <UserRegistrationForm {...mockProps} />
    //     );
    //     const lastNameInput = within(getByTestId(TEST_IDS.LAST_NAME)).getByRole(
    //         'textbox'
    //     );
    //     const submitButton = getByTestId(TEST_IDS.SUBMIT_BUTTON);
    //     await user.type(lastNameInput, 'b{backspace}');
    //     fireEvent.blur(lastNameInput);
    //     expect(submitButton).toBeDisabled();
    //     expect(
    //         getByText(
    //             createNameValidationErrorMessages('Last Name')[
    //                 NameValidationType.Required
    //             ]
    //         )
    //     ).toBeVisible();
    // });
    // it('prefills email input', async () => {
    //     const { getByTestId } = renderWithTheme(
    //         <UserRegistrationForm {...{ ...mockProps, defaultEmail: email }} />
    //     );
    //     const emailInput = within(
    //         getByTestId(TEST_IDS.EMAIL_ADDRESS)
    //     ).getByRole('textbox');
    //     expect(emailInput).toHaveAttribute('value', email);
    // });
    // it('catches invalid email input', async () => {
    //     const { getByTestId, getByText } = renderWithTheme(
    //         <UserRegistrationForm {...mockProps} />
    //     );
    //     const emailInput = within(
    //         getByTestId(TEST_IDS.EMAIL_ADDRESS)
    //     ).getByRole('textbox');
    //     const submitButton = getByTestId(TEST_IDS.SUBMIT_BUTTON);
    //     await user.type(emailInput, 'bad-email@');
    //     fireEvent.blur(emailInput);
    //     expect(submitButton).toBeDisabled();
    //     expect(
    //         getByText(emailValidationErrorMessages[EmailValidationType.IsValid])
    //     ).toBeVisible();
    // });
    // it('catches invalid password input', async () => {
    //     const { getByTestId, getByText } = renderWithTheme(
    //         <UserRegistrationForm {...mockProps} />
    //     );
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const passwordInput = getByTestId(TEST_IDS.PASSWORD).firstElementChild!;
    //     await user.type(passwordInput, 'abcABC!!!');
    //     fireEvent.blur(passwordInput);
    //     expect(
    //         getByText(
    //             passwordValidationErrorMessages[PasswordValidationType.Number]
    //         )
    //     ).toBeVisible();
    // });
    // it('catches invalid password confirmation input', async () => {
    //     const { getByTestId, getByText } = renderWithTheme(
    //         <UserRegistrationForm {...mockProps} />
    //     );
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const passwordInput = getByTestId(TEST_IDS.PASSWORD).firstElementChild!;
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const confirmPasswordInput = getByTestId(TEST_IDS.CONFIRM_PASSWORD)
    //         .firstElementChild!;
    //     await user.type(passwordInput, password);
    //     await user.type(confirmPasswordInput, '123');
    //     fireEvent.blur(confirmPasswordInput);
    //     expect(
    //         getByText(
    //             passwordValidationErrorMessages[
    //                 PasswordValidationType.Confirmation
    //             ]
    //         )
    //     ).toBeVisible();
    // });

    // it('catches invalid date of birth', async () => {
    //     const { getByLabelText, getByText, getByTestId } = renderWithTheme(
    //         <UserRegistrationForm {...mockProps} />
    //     );
    //     const errorMessages = createDateValidationErrorMessages({});
    //     const dobInput = within(
    //         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //         getByLabelText('Date of Birth *').parentElement!
    //     ).getByRole('textbox');
    //     const submitButton = getByTestId(TEST_IDS.SUBMIT_BUTTON);
    //     await user.type(dobInput, '1');
    //     fireEvent.blur(dobInput);
    //     expect(submitButton).toBeDisabled();
    //     expect(
    //         getByText(errorMessages[DateValidationType.IsValid])
    //     ).toBeVisible();
    // });

    // it('displays error message', () => {
    //     const errorMessage = 'Oh yea, big error guy.';
    //     const { getByText } = renderWithTheme(
    //         <UserRegistrationForm {...{ ...mockProps, errorMessage }} />
    //     );
    //     expect(getByText(errorMessage)).toBeVisible();
    // });
});
