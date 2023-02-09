import { FormSectionTitle, Caption } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { MaximumRateInput } from './MaximumRate';
import { MinimumRateInput } from './MinimumRate';
import { OffersSlidingScaleToggle } from './OffersSlidingScale';

interface PricingInputsProps {
    control: Control<ProviderProfile>;
    defaultValues: {
        offersSlidingScale?: boolean;
        minimumRate?: number;
        maximumRate?: number;
    };
    offersSlidingScale?: boolean;
    minimumRate?: number;
    disabled?: boolean;
}
export const PricingInputs = ({
    control,
    defaultValues,
    offersSlidingScale,
    minimumRate,
    disabled,
}: PricingInputsProps) => {
    return (
        <Box>
            <FormSectionTitle>Pricing</FormSectionTitle>
            <Box marginBottom={4}>
                <OffersSlidingScaleToggle
                    control={control}
                    defaultValue={defaultValues?.offersSlidingScale}
                    disabled={disabled}
                />
            </Box>
            <PriceScaleContainer>
                <MinimumRateInput
                    control={control}
                    label={
                        offersSlidingScale
                            ? 'Minimum Rate'
                            : 'Your rate per session'
                    }
                    defaultValue={defaultValues?.minimumRate}
                    disabled={disabled}
                />
                {offersSlidingScale && (
                    <MaximumRateInput
                        control={control}
                        disabled={disabled}
                        defaultValue={defaultValues?.maximumRate}
                        minimumRate={minimumRate}
                    />
                )}
            </PriceScaleContainer>
            <Caption>Your rate in dollars per 50 minute session</Caption>
        </Box>
    );
};

const PriceScaleContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    '& > *': {
        flex: 2,
        width: `calc(50% - ${theme.spacing(1)})`,

        '&:nth-of-type(2)': {
            marginLeft: theme.spacing(2),
        },
    },
}));
