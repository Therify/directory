import { renderWithTheme } from '@/lib/shared/components/fixtures';
import { Gender, UNITED_STATES, Ethnicity } from '@/lib/shared/types';
import { TEST_IDS as AVATAR_TEST_IDS } from '@/lib/shared/components/ui/Avatar';
import userEvent from '@testing-library/user-event';
import { TherifyUser } from '@/lib/shared/types';
import { AccountView } from './AccountView';
import { AccountForm } from './form';
import { sleep } from '@/lib/shared/utils';
const mockUseCloudinaryWidget = jest.fn();
jest.mock('@/lib/modules/media/components/hooks/userCloudinaryWidget', () => ({
    useCloudinaryWidget: (args: unknown) => mockUseCloudinaryWidget(args),
}));

const mockUser = {} as TherifyUser.TherifyUser;

describe('SettingsPage > Account View', () => {
    const user = userEvent.setup();
    beforeEach(() => {
        mockUseCloudinaryWidget.mockClear();
    });
    describe('Image upload', () => {
        it('calls onImageUploadSuccess when the upload is successful', async () => {
            const onImageUploadSuccess = jest.fn();
            renderWithTheme(
                <AccountView
                    user={mockUser}
                    onUpdateUserDetails={jest.fn()}
                    onImageUploadSuccess={onImageUploadSuccess}
                    onImageUploadError={jest.fn()}
                />
            );
            // Get the onUploadResult callback passed to the cloudinary widget
            // and simulate a successful upload event
            const cloudinaryParams = mockUseCloudinaryWidget.mock.calls[0][0];
            const mockUploadResult = { event: 'success' };
            cloudinaryParams.onUploadResult(null, mockUploadResult);

            expect(onImageUploadSuccess).toHaveBeenCalledWith(
                null,
                mockUploadResult
            );
        });

        it('calls onImageUploadError when the upload fails', async () => {
            const onImageUploadError = jest.fn();
            renderWithTheme(
                <AccountView
                    user={mockUser}
                    onUpdateUserDetails={jest.fn()}
                    onImageUploadSuccess={jest.fn()}
                    onImageUploadError={onImageUploadError}
                />
            );
            // Get the onUploadResult callback passed to the cloudinary widget
            // and simulate a failed upload
            const cloudinaryParams = mockUseCloudinaryWidget.mock.calls[0][0];
            const mockUploadError = new Error('Upload failed');
            cloudinaryParams.onUploadResult(mockUploadError);

            expect(onImageUploadError).toHaveBeenCalledWith(mockUploadError);
        });

        it('renders the profile image', () => {
            const mockImageUrl = 'test-url';
            const { getByTestId } = renderWithTheme(
                <AccountView
                    user={mockUser}
                    onUpdateUserDetails={jest.fn()}
                    onImageUploadSuccess={jest.fn()}
                    onImageUploadError={jest.fn()}
                    imageUrl={mockImageUrl}
                />
            );
            const image = getByTestId(AVATAR_TEST_IDS.AVATAR).firstElementChild;
            expect(image?.getAttribute('src')).toBe(mockImageUrl);
        });
    });

    describe('Account Details Form', () => {
        const mockAccountDetails = {
            givenName: 'Test',
            surname: 'User',
            emailAddress: 'test@therify.co',
        } as TherifyUser.TherifyUser;
        const mockUserDetails: AccountForm = {
            accountDetails: {
                givenName: 'Updated',
                surname: 'User',
                emailAddress: 'test@therify.co',
                phoneNumber: '1234567890',
            },
            personalDetails: {
                state: UNITED_STATES.STATE.ENTRIES[0],
                gender: Gender.ENTRIES[0],
                ethnicity: Ethnicity.ENTRIES[0],
            },
            emergencyDetails: {
                contactName: 'Test User',
                contactPhoneNumber: '1234567890',
                contactRelationship: 'Parent',
                homeAddress: '123 Street St',
            },
        };
        it('prefills the form', () => {
            const { getByLabelText } = renderWithTheme(
                <AccountView
                    user={mockAccountDetails}
                    onUpdateUserDetails={jest.fn()}
                    onImageUploadSuccess={jest.fn()}
                    onImageUploadError={jest.fn()}
                    defaultAccountDetails={mockUserDetails}
                />
            );

            expect(getByLabelText('First Name')).toHaveValue(
                mockUserDetails.accountDetails.givenName
            );
            expect(getByLabelText('Last Name')).toHaveValue(
                mockUserDetails.accountDetails.surname
            );
            expect(getByLabelText('Email Address')).toHaveValue(
                mockUserDetails.accountDetails.emailAddress
            );
            expect(getByLabelText('Phone Number')).toHaveValue(
                mockUserDetails.accountDetails.phoneNumber
            );
            expect(getByLabelText('Emergency Contact Name')).toHaveValue(
                mockUserDetails.emergencyDetails.contactName
            );
            expect(getByLabelText('Emergency Phone Number')).toHaveValue(
                mockUserDetails.emergencyDetails.contactPhoneNumber
            );
            expect(getByLabelText('Emergency Contact Relation')).toHaveValue(
                mockUserDetails.emergencyDetails.contactRelationship
            );
            expect(getByLabelText('Your Home Address')).toHaveValue(
                mockUserDetails.emergencyDetails.homeAddress
            );
            // select.nextSibling is the hidden rendered input that holds the selected value
            expect(getByLabelText('State').nextSibling).toHaveValue(
                mockUserDetails.personalDetails.state
            );
            expect(getByLabelText('Gender').nextSibling).toHaveValue(
                mockUserDetails.personalDetails.gender
            );
            expect(getByLabelText('Ethnicity').nextSibling).toHaveValue(
                mockUserDetails.personalDetails.ethnicity
            );
        });

        it('submits the form with the updated user details', async () => {
            const onUpdateUserDetails = jest.fn();
            const { getByLabelText, getByText } = renderWithTheme(
                <AccountView
                    user={mockUser}
                    onUpdateUserDetails={onUpdateUserDetails}
                    onImageUploadSuccess={jest.fn()}
                    onImageUploadError={jest.fn()}
                />
            );
            await user.type(
                getByLabelText('First Name'),
                mockUserDetails.accountDetails.givenName
            );
            await user.type(
                getByLabelText('Last Name'),
                mockUserDetails.accountDetails.surname
            );
            await user.type(
                getByLabelText('Email Address'),
                mockUserDetails.accountDetails.emailAddress
            );
            await user.type(
                getByLabelText('Phone Number'),
                mockUserDetails.accountDetails.phoneNumber
            );
            await user.type(
                getByLabelText('Emergency Contact Name'),
                mockUserDetails.emergencyDetails.contactName
            );
            await user.type(
                getByLabelText('Emergency Phone Number'),
                mockUserDetails.emergencyDetails.contactPhoneNumber
            );
            await user.type(
                getByLabelText('Emergency Contact Relation'),
                mockUserDetails.emergencyDetails.contactRelationship
            );
            await user.type(
                getByLabelText('Your Home Address'),
                mockUserDetails.emergencyDetails.homeAddress
            );
            await user.click(getByLabelText('State'));
            await user.click(getByText(mockUserDetails.personalDetails.state));
            await user.click(getByLabelText('Gender'));
            await user.click(getByText(mockUserDetails.personalDetails.gender));
            await user.click(getByLabelText('Ethnicity'));
            await user.click(
                getByText(mockUserDetails.personalDetails.ethnicity)
            );
            await user.click(getByText('Save Changes'));
            expect(onUpdateUserDetails).toHaveBeenCalledWith(mockUserDetails);
        });
    });
});
