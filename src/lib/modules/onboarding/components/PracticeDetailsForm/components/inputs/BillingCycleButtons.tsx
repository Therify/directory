import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control, Controller } from 'react-hook-form';

interface BillingCycleButtonsProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: HandlePracticeOnboarding.Input['billingCycle'];
    disabled?: boolean;
}

const BILLING_CYCLE_OPTIONS = {
    MONTHLY: 'month',
    ANNUAL: 'year',
} as const;

export const BillingCycleButtons = ({
    defaultValue,
    control,
    disabled,
}: BillingCycleButtonsProps) => {
    return (
        <Controller
            control={control}
            name="billingCycle"
            defaultValue={defaultValue ?? 'month'}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value, name } }) => (
                <ButtonGroup
                    color="primary"
                    value={value}
                    exclusive
                    onChange={onChange}
                    aria-label="Subscription Cycle"
                    disabled={disabled}
                    {...{
                        name,
                        onBlur,
                    }}
                >
                    <ToggleButton value={BILLING_CYCLE_OPTIONS.MONTHLY}>
                        Monthly
                    </ToggleButton>
                    <ToggleButton value={BILLING_CYCLE_OPTIONS.ANNUAL}>
                        Annual
                    </ToggleButton>
                </ButtonGroup>
            )}
        />
    );
};

const ButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    '& > button': {
        flex: 1,
        '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: `1px solid ${theme.palette.primary.main}`,
        },
    },
}));
