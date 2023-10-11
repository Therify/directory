import {
    FormConfig,
    FormSection,
} from '@/lib/shared/components/ui/FormElements/FormRenderer/types';
import { Gender, UNITED_STATES, Ethnicity } from '@/lib/shared/types';
import { Type as AccountSettingsForm } from './schema';

const accountDetails: FormSection<AccountSettingsForm> = {
    title: 'Account Details',
    fields: [
        {
            id: 'givenName',
            type: 'input',
            label: 'First Name',
            inputType: 'text',
            statePath: 'accountDetails.givenName',
        },
        {
            id: 'surname',
            type: 'input',
            label: 'Last Name',
            inputType: 'text',
            statePath: 'accountDetails.surname',
        },
        {
            id: 'emailAddress',
            type: 'input',
            label: 'Email Address',
            inputType: 'email',
            statePath: 'accountDetails.emailAddress',
        },
        {
            id: 'phoneNumber',
            type: 'input',
            label: 'Phone Number',
            inputType: 'text',
            statePath: 'accountDetails.phoneNumber',
        },
    ],
};

const personalDetails: FormSection<AccountSettingsForm> = {
    title: 'Personal Details',
    fields: [
        {
            id: 'state',
            type: 'select',
            label: 'State',
            statePath: 'personalDetails.state',
            options: [...UNITED_STATES.STATE.ENTRIES],
        },
        {
            id: 'gender',
            type: 'select',
            label: 'Gender',
            statePath: 'personalDetails.gender',
            options: [...Gender.ENTRIES],
        },
        {
            id: 'ethnicity',
            type: 'select',
            label: 'Ethnicity',
            statePath: 'personalDetails.ethnicity',
            options: [...Ethnicity.ENTRIES],
        },
    ],
};

const emergencyDetails: FormSection<AccountSettingsForm> = {
    title: 'Emergency Details',
    fields: [
        {
            id: 'address',
            type: 'input',
            label: 'Your Address',
            inputType: 'text',
            statePath: 'emergencyDetails.homeAddress',
        },
        {
            id: 'emergencyPhoneNumber',
            type: 'input',
            label: 'Emergency Phone Number',
            inputType: 'text',
            statePath: 'emergencyDetails.contactPhoneNumber',
        },
        {
            id: 'emergencyContactName',
            type: 'input',
            label: 'Emergency Contact Name',
            inputType: 'text',
            statePath: 'emergencyDetails.contactName',
        },
        {
            id: 'emergencyContactcontactRelationship',
            type: 'input',
            label: 'Emergency Contact Relation',
            inputType: 'text',
            statePath: 'emergencyDetails.contactRelationship',
        },
    ],
};

export const config: FormConfig<AccountSettingsForm> = {
    sections: [accountDetails, personalDetails, emergencyDetails],
};
