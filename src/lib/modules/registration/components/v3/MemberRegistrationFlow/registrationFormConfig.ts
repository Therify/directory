import { RegisterMember } from '@/lib/modules/registration/features/v3';
import { FormRendererTypes } from '@/lib/shared/components/ui';
import {
    UNITED_STATES,
    InsuranceProvider,
    Gender,
    Ethnicity,
} from '@/lib/shared/types';
import z from 'zod';

export const memberRegistrationFormConfig: FormRendererTypes.FormConfig<
    z.infer<typeof RegisterMember.inputSchema>
> = {
    title: "We're happy you're here! 🎉 😊",
    subtitle: 'To start, let’s get some basic information from you.',
    sections: [
        {
            title: 'Account Details',
            fields: [
                {
                    id: 'firstName',
                    required: true,
                    type: 'input',
                    label: 'First Name',
                    inputType: 'text',
                    statePath: 'user.givenName',
                },
                {
                    id: 'lastName',
                    required: true,
                    type: 'input',
                    label: 'Last Name',
                    inputType: 'text',
                    statePath: 'user.surname',
                },
                {
                    id: 'email',
                    required: true,
                    type: 'input',
                    label: 'Email Address',
                    inputType: 'email',
                    statePath: 'user.emailAddress',
                },
                {
                    id: 'phoneNumber',
                    required: true,
                    type: 'input',
                    label: 'Phone Number',
                    inputType: 'text',
                    statePath: 'user.phoneNumber',
                },
                {
                    id: 'password',
                    required: true,
                    type: 'password',
                    label: 'Password',
                    allowShowPassword: true,
                    statePath: 'user.password',
                },
                {
                    id: 'confirmPassword',
                    required: true,
                    type: 'password',
                    label: 'Confirm Password',
                    allowShowPassword: true,
                    statePath: 'user.confirmPassword',
                },
            ],
        },
        {
            title: 'Personal Details',
            fields: [
                {
                    id: 'state',
                    required: true,
                    type: 'select',
                    label: 'State',
                    statePath: 'profile.state',
                    options: [...UNITED_STATES.STATE.ENTRIES],
                },
                {
                    id: 'inurance',
                    required: true,
                    type: 'select',
                    label: 'Insurance',
                    statePath: 'profile.insurance',
                    options: [...InsuranceProvider.ENTRIES],
                },
                {
                    id: 'gender',
                    required: true,
                    type: 'select',
                    label: 'Gender',
                    statePath: 'profile.gender',
                    options: [...Gender.ENTRIES],
                },
                {
                    id: 'ethnicity',
                    required: true,
                    type: 'select',
                    label: 'Ethnicity',
                    statePath: 'profile.ethnicity',
                    options: [...Ethnicity.ENTRIES],
                },
                {
                    id: 'address',
                    required: true,
                    type: 'input',
                    label: 'Your Address',
                    inputType: 'text',
                    statePath: 'profile.homeAddress',
                },
                {
                    id: 'dateOfBirth',
                    required: true,
                    type: 'date',
                    label: 'Date of Birth',
                    statePath: 'user.dateOfBirth',
                },
            ],
        },
        {
            title: 'Emergency Details',
            fields: [
                {
                    id: 'emergencyPhoneNumber',
                    required: true,
                    type: 'input',
                    label: 'Emergency Phone Number',
                    inputType: 'text',
                    statePath: 'emergencyDetails.contactPhoneNumber',
                },
                {
                    id: 'emergencyContactName',
                    required: true,
                    type: 'input',
                    label: 'Emergency Contact Name',
                    inputType: 'text',
                    statePath: 'emergencyDetails.contactName',
                },
                {
                    id: 'emergencyContactcontactRelationship',
                    required: true,
                    type: 'input',
                    label: 'Emergency Contact Relation',
                    inputType: 'text',
                    statePath: 'emergencyDetails.contactRelationship',
                },
            ],
        },
        {
            fields: [
                {
                    id: 'hasAcceptedTermsAndConditions',
                    required: true,
                    fullWidth: true,
                    type: 'toggle',
                    toggleType: 'checkbox',
                    // TODO: allow markdown
                    label: "  I agree to Therify's Terms of Service and Privacy Policy.",
                    statePath: 'hasAcceptedTermsAndConditions',
                },
            ],
        },
    ],
};
