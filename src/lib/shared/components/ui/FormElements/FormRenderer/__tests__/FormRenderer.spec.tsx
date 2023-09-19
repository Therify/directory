import { sleep } from '@/lib/shared/utils';
import userEvent from '@testing-library/user-event';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { FormRenderer, TEST_IDS } from '../FormRenderer';
import { FormConfig, FormField } from '../types';
import { renderWithTheme } from '../../../../fixtures';

function getMockInputConfig<T extends FieldValues>(
    field: FormField<T>
): FormConfig<T> {
    return {
        title: 'title',
        sections: [
            {
                title: 'Section 1',
                fields: [field],
            },
        ],
    };
}

describe('FormRenderer', () => {
    const user = userEvent.setup();
    const mockSchema = z.object({});
    const mockConfig: FormConfig<z.infer<typeof mockSchema>> = {
        title: 'Title',
        sections: [],
    };
    it('renders form title', () => {
        const title = 'Config Driven Form';
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({})}
                config={{ title, sections: [] }}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );

        expect(getByText(title)).toBeVisible();
    });

    it('renders subtitle', () => {
        const title = 'Config Driven Form';
        const subtitle = 'subtitle';
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({})}
                config={{ title, subtitle, sections: [] }}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );

        expect(getByText(subtitle)).toBeVisible();
    });

    it('renders section title', () => {
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({})}
                config={{
                    title: 'Title',
                    sections: [
                        {
                            title: 'Section 1',
                            fields: [],
                        },
                    ],
                }}
                validationMode={'onChange'}
                onSubmit={jest.fn()}
            />
        );

        expect(getByText('Section 1')).toBeVisible();
    });

    it('displays error message', async () => {
        const errorMessage = 'This is an error message';
        const { getByText } = renderWithTheme(
            <FormRenderer
                validationSchema={z.object({})}
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
            <FormRenderer
                validationSchema={z.object({
                    firstName: z.string(),
                })}
                config={getMockInputConfig({
                    id: 'test',
                    type: 'input',
                    label: 'First Name',
                    placeholder: 'First Name',
                    statePath: 'firstName',
                    inputType: 'text',
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

    describe('buttons', () => {
        it('renders submit button text', () => {
            const { getByText } = renderWithTheme(
                <FormRenderer
                    validationSchema={z.object({})}
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
                <FormRenderer
                    validationSchema={z.object({})}
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
                <FormRenderer
                    validationSchema={z.object({})}
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
                <FormRenderer
                    validationSchema={z.object({})}
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
            const { getByText } = renderWithTheme(
                <FormRenderer
                    validationSchema={z.object({
                        firstName: z.string(),
                    })}
                    config={getMockInputConfig({
                        id: 'test',
                        type: 'input',
                        label: 'First Name',
                        placeholder: 'First Name',
                        statePath: 'firstName',
                        inputType: 'text',
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
                <FormRenderer
                    validationSchema={z.object({
                        firstName: z.string(),
                    })}
                    config={getMockInputConfig({
                        id: 'test',
                        type: 'input',
                        label: 'First Name',
                        placeholder: 'First Name',
                        statePath: 'firstName',
                        inputType: 'text',
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
});
