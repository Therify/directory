import { AcceptedInsurance, InsuranceProvider, State } from '@/lib/types';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { Autocomplete, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Control, Controller } from 'react-hook-form';
import { Caption, FormSectionSubtitle } from '@/components/ui';

interface AcceptedInsuranceInputProps {
    control: Control<ProviderProfile>;
    stateOptions: State.State[];
}
type InsuranceByState = Record<
    AcceptedInsurance.AcceptedInsurance['state'],
    AcceptedInsurance.AcceptedInsurance['insurances']
>;
export const AcceptedInsuranceInput = ({
    control,
    stateOptions,
}: AcceptedInsuranceInputProps) => (
    <Controller
        control={control}
        name="acceptedInsurances"
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value: acceptedInsurances, name },
        }) => {
            const insurancesByState = acceptedInsurances.reduce(
                (acc, value) => {
                    acc[value.state] = value.insurances;
                    return acc;
                },
                {} as InsuranceByState
            );
            return (
                <InputWrapper>
                    <FormSectionSubtitle>
                        Accepted Insurances
                    </FormSectionSubtitle>
                    <Box>
                        {stateOptions.length === 0 ? (
                            <Caption>Add a license.</Caption>
                        ) : (
                            <Caption>
                                Based on your licenses, please select any
                                insurance panels you are in-network within these
                                states.
                            </Caption>
                        )}
                    </Box>
                    {stateOptions.map((state) => {
                        return (
                            <Autocomplete
                                key={state}
                                multiple
                                options={InsuranceProvider.ENTRIES}
                                onChange={(_, value) => {
                                    const update = Object.entries(
                                        insurancesByState
                                    ).map(([stateKey, insurances]) => ({
                                        state: stateKey,
                                        insurances:
                                            state === stateKey
                                                ? value
                                                : insurances,
                                    }));

                                    onChange(update);
                                }}
                                value={insurancesByState[state] ?? []}
                                {...{
                                    onBlur,
                                    name,
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField {...params} label={state} />
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
