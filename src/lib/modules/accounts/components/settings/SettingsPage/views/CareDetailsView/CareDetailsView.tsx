import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { TherifyUser } from '@/lib/shared/types';
import { PlanDetails, Dependent, ShareCard, InsuranceForm } from './ui';
import { InsuranceProviderForm } from './form';
import { UseFormReset } from 'react-hook-form';

interface CareDetailsViewProps {
    plan: TherifyUser.TherifyUser['plan'];
    dependents: Dependent[];
    insuranceProvider?: InsuranceProviderForm['insuranceProvider'];
    onCreateShareableLink: () => void;
    onRemoveDependent: (dependentId: string) => void;
    onUpdateInsuranceDetails: (
        data: InsuranceProviderForm,
        resetForm: UseFormReset<InsuranceProviderForm>
    ) => void;
}
export const CareDetailsView = ({
    plan,
    dependents,
    onCreateShareableLink,
    onUpdateInsuranceDetails,
    onRemoveDependent,
    insuranceProvider,
}: CareDetailsViewProps) => {
    return (
        <Container>
            <PlanDetails
                plan={plan}
                dependents={dependents}
                onRemoveDependent={onRemoveDependent}
            />
            <ShareCard onCreateShareableLink={onCreateShareableLink} />
            <InsuranceForm
                defaultValues={{
                    insuranceProvider,
                }}
                onUpdateInsuranceDetails={onUpdateInsuranceDetails}
            />
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    maxWidth: 600,
    padding: theme.spacing(14, 0, 10),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(20, 0, 10),
    },
}));
