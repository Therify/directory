import { FormRenderer } from '@/lib/shared/components/ui';
import { DeepPartial, UseFormReset } from 'react-hook-form';
import { InsuranceProviderForm, insuranceProviderForm } from '../form';

interface InsuranceFormProps {
    defaultValues?: DeepPartial<InsuranceProviderForm>;
    onUpdateInsuranceDetails: (
        data: InsuranceProviderForm,
        resetForm: UseFormReset<InsuranceProviderForm>
    ) => void;
}
export const InsuranceForm = ({
    defaultValues,
    onUpdateInsuranceDetails,
}: InsuranceFormProps) => {
    return (
        <FormRenderer
            validationSchema={insuranceProviderForm.schema}
            config={insuranceProviderForm.config}
            submitButtonText="Save changes"
            defaultValues={defaultValues}
            onSubmit={onUpdateInsuranceDetails}
            sx={{
                maxWidth: 600,
                '& > div': {
                    padding: 0,
                },
            }}
        />
    );
};
