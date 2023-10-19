import {
    FormConfig,
    FormSection,
} from '@/lib/shared/components/ui/FormElements/FormRenderer/types';
import { InsuranceProvider } from '@/lib/shared/types';
import { Type as InsuranceDetailsForm } from './schema';

const insuranceDetails: FormSection<InsuranceDetailsForm> = {
    title: 'Insurance Details',
    fields: [
        {
            id: 'insuranceProvider',
            type: 'select',
            label: 'Insurance Provider',
            statePath: 'insuranceProvider',
            options: [...InsuranceProvider.ENTRIES],
        },
    ],
};

export const config: FormConfig<InsuranceDetailsForm> = {
    sections: [insuranceDetails],
};
