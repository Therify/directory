/**
 * This file contains the form IDs for the different forms in the application.
 */

import { NodeEnvironment } from '@/lib/shared/types';

export const FORMS = {
    REIMBURSMENT_REQUEST_V2: 'REIMBURSMENT_REQUEST_V2',
} as const;

export type Form = (typeof FORMS)[keyof typeof FORMS];

export const DEVELOPMENT_FORM_IDS: Record<Form, string> = {
    [FORMS.REIMBURSMENT_REQUEST_V2]: '231355344303144',
} as const;

export const PRODUCTION_FORM_IDS: Record<Form, string> = {
    [FORMS.REIMBURSMENT_REQUEST_V2]: '221371005584146',
} as const;

export const FORMS_BY_ENVIRONMENT: Record<
    'development' | 'production',
    Record<Form, string>
> = {
    development: DEVELOPMENT_FORM_IDS,
    production: PRODUCTION_FORM_IDS,
} as const;

export const getFormsByEnvironment = (environment: NodeEnvironment) => {
    if (environment !== 'production') {
        return FORMS_BY_ENVIRONMENT['development'];
    }
    return FORMS_BY_ENVIRONMENT['production'];
};

/**
 * Get the ID for a given form and environment
 * @param form - The form to get the ID for
 * @param environment - The environment to get the ID for
 * @returns
 */
export function getFormByEnvironment(
    form: Form,
    environment: NodeEnvironment = 'development'
) {
    return getFormsByEnvironment(environment)[form];
}
