import {
    AcceptedInsurance,
    InsuranceProvider,
    Region,
    ProviderProfile,
} from '@/lib/shared/types';
import { Autocomplete, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control, Controller } from 'react-hook-form';
import { Caption, FormSectionSubtitle } from '@/lib/shared/components/ui';

interface AcceptedInsuranceInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    locationOptions: Region.StateAndCountry[];
}
type InsuranceByState = Record<
    string,
    AcceptedInsurance.AcceptedInsurance['insurances']
>;
export const AcceptedInsuranceInput = ({
    control,
    locationOptions,
}: AcceptedInsuranceInputProps) => (
    <Controller
        control={control}
        name="acceptedInsurances"
        render={({
            field: { onChange, onBlur, value: acceptedInsurances, name },
        }) => {
            console.log({ locationOptions });
            const insurancesByState = acceptedInsurances.reduce(
                (acc, value) => {
                    acc[`${value.state}, ${value.country}`] = value.insurances;
                    return acc;
                },
                {} as InsuranceByState
            );
            const hasMultipleCountries =
                new Set(locationOptions.map((l) => l.country)).size > 1;
            return (
                <InputWrapper>
                    <FormSectionSubtitle>
                        Accepted Insurances
                    </FormSectionSubtitle>
                    <Box>
                        {locationOptions.length === 0 ? (
                            <Caption>Add a license.</Caption>
                        ) : (
                            <Caption>
                                Based on your licenses, please select any
                                insurance panels you are in-network with in
                                these locations.
                            </Caption>
                        )}
                    </Box>
                    {locationOptions.map((location) => {
                        const locationKey = `${location.state}, ${location.country}`;
                        return (
                            <Autocomplete
                                key={locationKey}
                                multiple
                                options={InsuranceProvider.ENTRIES}
                                onChange={(_, value) => {
                                    const update = Object.entries(
                                        insurancesByState
                                    ).map(([stateKey, insurances]) => ({
                                        state: stateKey,
                                        insurances:
                                            locationKey === stateKey
                                                ? value
                                                : insurances,
                                    }));

                                    onChange(update);
                                }}
                                value={insurancesByState[locationKey] ?? []}
                                {...{
                                    onBlur,
                                    name,
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={
                                            hasMultipleCountries
                                                ? locationKey
                                                : location.state
                                        }
                                    />
                                )}
                            />
                        );
                    })}
                </InputWrapper>
            );
        }}
    />
);

const InputWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    flexWrap: 'wrap',
    '& > div': {
        marginBottom: theme.spacing(4),
        width: '100%',
    },
    '& .MuiInputBase-root, &.MuiSelect-select': { margin: 0 },
}));
