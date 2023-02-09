import { ProviderProfile } from '@/lib/types/providerProfile';
import { Box } from '@mui/material';
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
}
export const PricingInputs = ({
    control,
    defaultValues,
    offersSlidingScale,
}: PricingInputsProps) => {
    return (
        <Box>
            <OffersSlidingScaleToggle
                control={control}
                defaultValue={defaultValues?.offersSlidingScale}
            />
            <Box display="flex" justifyContent="flex-start">
                <MinimumRateInput
                    control={control}
                    label={
                        offersSlidingScale
                            ? 'Minimum Rate'
                            : 'Your rate per session'
                    }
                    defaultValue={defaultValues?.minimumRate}
                />
                {offersSlidingScale && (
                    <MaximumRateInput
                        control={control}
                        defaultValue={defaultValues?.maximumRate}
                    />
                )}
            </Box>
        </Box>
    );
};
