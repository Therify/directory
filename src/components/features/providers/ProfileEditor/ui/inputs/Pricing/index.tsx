import { FormSectionTitle, Caption } from '@/components/ui';
import { ProviderProfile } from '@/lib/types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control } from 'react-hook-form';
import { MaximumRateInput } from './MaximumRate';
import { MinimumRateInput } from './MinimumRate';
import { OffersSlidingScaleToggle } from './OffersSlidingScale';

interface PricingInputsProps {
    control: Control<ProviderProfile.ProviderProfile>;
    offersSlidingScale?: boolean;
    minimumRate?: number;
    disabled?: boolean;
}
export const PricingInputs = ({
    control,
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
                    disabled={disabled}
                />
            </Box>
            <PriceScaleContainer>
                <MinimumRateInput
                    control={control}
                    label={
                        offersSlidingScale ? 'Minimum Rate' : 'Rate per session'
                    }
                    disabled={disabled}
                />
                <MaximumRateInput
                    control={control}
                    disabled={disabled}
                    minimumRate={minimumRate}
                    visible={offersSlidingScale}
                />
            </PriceScaleContainer>
            <Caption>Your rate in dollars per 45 minute session</Caption>
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
