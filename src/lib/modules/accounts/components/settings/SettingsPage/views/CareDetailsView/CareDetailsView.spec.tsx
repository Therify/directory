import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { TherifyUser, InsuranceProvider } from '@/lib/shared/types';
import userEvent from '@testing-library/user-event';
import { CareDetailsView } from './CareDetailsView';
import { PlanStatus } from '@prisma/client';
import { Dependent } from './ui';

const mockPlan: TherifyUser.TherifyUser['plan'] = {
    startDate: new Date('1-1-2001').toISOString(),
    endDate: new Date('1-1-2002').toISOString(),
    status: PlanStatus.active,
    renews: true,
    seats: 5,
    coveredSessions: 0,
};
const mockDependents: Dependent[] = [
    {
        id: '1',
        givenName: 'John',
        surname: 'Doe',
        emailAddress: 'test@therify.co',
    },
    {
        id: '2',
        givenName: 'Jane',
        surname: 'Doe',
        emailAddress: 'test2@therify.co',
    },
];

describe('SettingsPage > Care Details View', () => {
    const user = userEvent.setup();
    const mockWriteText = jest.fn();
    beforeEach(() => {
        mockWriteText.mockClear();
    });
    describe('Plan details', () => {
        it('renders active plan status', () => {
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={[]}
                    onRemoveDependent={jest.fn()}
                />
            );
            expect(getByText('Active')).toBeVisible();
        });
        it('renders inactive plan status', () => {
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={{ ...mockPlan, status: PlanStatus.canceled }}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={[]}
                    onRemoveDependent={jest.fn()}
                />
            );
            expect(getByText('Canceled')).toBeVisible();
        });
        it('renders unknown plan status', () => {
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={{
                        ...mockPlan,
                        status: 'who knows' as PlanStatus,
                    }}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={[]}
                    onRemoveDependent={jest.fn()}
                />
            );
            expect(getByText('Unknown')).toBeVisible();
        });
        it('formats plan dates', () => {
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={[]}
                    onRemoveDependent={jest.fn()}
                />
            );
            expect(getByText('Started: Jan 1st, 2001')).toBeVisible();
            expect(getByText('Ends: Jan 1st, 2002')).toBeVisible();
        });

        it('renders dependents', () => {
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={mockDependents}
                    onRemoveDependent={jest.fn()}
                />
            );
            expect(getByText('Dependents: John Doe, Jane Doe')).toBeVisible();
        });

        it('removes dependents', async () => {
            const onRemoveDependent = jest.fn();
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={mockDependents}
                    onRemoveDependent={onRemoveDependent}
                />
            );
            await user.click(getByText('Remove dependents'));
            const removeButton = getByText(
                `${mockDependents[0].givenName} ${mockDependents[0].surname}`
            ).nextElementSibling;
            await user.click(removeButton!);
            expect(onRemoveDependent).toHaveBeenCalledWith(
                mockDependents[0].id
            );
        });

        it('allows canceling when removing dependents', async () => {
            const onRemoveDependent = jest.fn();
            const { queryByText, getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={mockDependents}
                    onRemoveDependent={onRemoveDependent}
                />
            );
            await user.click(getByText('Remove dependents'));
            const dependentName = `${mockDependents[0].givenName} ${mockDependents[0].surname}`;
            expect(getByText(dependentName)).toBeVisible();
            await user.click(getByText('Cancel'));
            expect(queryByText(dependentName)).toBeNull();
        });
    });

    describe('Shareable link', () => {
        it('calls onCreateShareableLink when the button is clicked', async () => {
            const onCreateShareableLink = jest.fn();
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={onCreateShareableLink}
                    insuranceProvider={undefined}
                    dependents={mockDependents}
                    onRemoveDependent={jest.fn()}
                />
            );

            await user.click(getByText('Create a shareable link'));
            expect(onCreateShareableLink).toHaveBeenCalled();
        });

        it('renders the shareable link', () => {
            const shareableLink = 'https://therify.co/invite/123';
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={mockDependents}
                    onRemoveDependent={jest.fn()}
                    dependentInvitationLink={shareableLink}
                />
            );
            expect(getByText(shareableLink)).toBeVisible();
        });

        it('copies the shareable link', async () => {
            global.window.navigator.clipboard.writeText = async (
                args: unknown
            ) => mockWriteText(args);
            const shareableLink = 'https://therify.co/invite/123';
            const { getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={undefined}
                    dependents={mockDependents}
                    onRemoveDependent={jest.fn()}
                    dependentInvitationLink={shareableLink}
                />
            );
            const inviteButton = getByText(shareableLink).nextElementSibling!;
            await user.click(inviteButton);
            expect(mockWriteText).toHaveBeenCalledWith(shareableLink);
        });
    });

    describe('Insurance Details', () => {
        it('prefils the form', () => {
            const insuranceProvider = InsuranceProvider.MAP.AETNA;
            const { getByLabelText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={jest.fn()}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={insuranceProvider}
                    dependents={mockDependents}
                    onRemoveDependent={jest.fn()}
                />
            );

            // select.nextSibling is the hidden rendered input that holds the selected value
            expect(
                getByLabelText('Insurance Provider').nextSibling
            ).toHaveValue(insuranceProvider);
        });

        it('submits the form with the updated user details', async () => {
            const insuranceProvider = InsuranceProvider.MAP.AETNA;
            const onUpdateUserDetails = jest.fn();
            const { getByLabelText, getByText } = renderWithTheme(
                <CareDetailsView
                    plan={mockPlan}
                    onUpdateInsuranceDetails={onUpdateUserDetails}
                    onCreateShareableLink={jest.fn()}
                    insuranceProvider={insuranceProvider}
                    dependents={mockDependents}
                    onRemoveDependent={jest.fn()}
                />
            );
            await user.click(getByLabelText('Insurance Provider'));
            await user.click(getByText(InsuranceProvider.MAP.CIGNA));
            await user.click(getByText('Save changes'));
            const updatedDataArg = onUpdateUserDetails.mock.calls[0][0];
            const resetFormArg = onUpdateUserDetails.mock.calls[0][1];
            expect(onUpdateUserDetails).toHaveBeenCalledTimes(1);
            expect(updatedDataArg).toEqual({
                insuranceProvider: InsuranceProvider.MAP.CIGNA,
            });
            expect(resetFormArg).toBeInstanceOf(Function);
        });
    });
});
