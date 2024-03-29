import { Control } from 'react-hook-form';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { StreetAddressInput } from './Street';
import { Address2Input } from './Address2';
import { CityInput } from './City';
import { StateInput } from './State';
import { ZipCodeInput } from './ZipCode';
import { CountryInput } from './Country';

interface PracticeAddressInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    disabled?: boolean;
    defaultValues?: Partial<
        Pick<
            HandlePracticeOnboarding.Input,
            'address' | 'address2' | 'city' | 'state' | 'zip' | 'country'
        >
    >;
    onInputBlur: () => void;
    country: HandlePracticeOnboarding.Input['country'];
}

export const PracticeAddressInput = ({
    control,
    defaultValues = {},
    onInputBlur,
    disabled,
    country,
}: PracticeAddressInputProps) => {
    return (
        <Box display="flex" flex={1} width="100%" flexDirection="column">
            <StreetContainer>
                <StreetAddressInput
                    control={control}
                    defaultValue={defaultValues.address}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                />
                <Address2Input
                    control={control}
                    defaultValue={defaultValues.address2 ?? undefined}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                />
            </StreetContainer>
            <StateContainer>
                <CityInput
                    control={control}
                    defaultValue={defaultValues.city}
                    onInputBlur={onInputBlur}
                    disabled={disabled}
                />
                <Box className="state-zip">
                    <StateInput
                        control={control}
                        defaultValue={defaultValues.state}
                        onInputBlur={onInputBlur}
                        disabled={disabled}
                        country={country}
                    />
                    <ZipCodeInput
                        control={control}
                        defaultValue={defaultValues.zip}
                        onInputBlur={onInputBlur}
                        disabled={disabled}
                        country={country}
                    />
                    <CountryInput
                        control={control}
                        defaultValue={defaultValues.country}
                        onInputBlur={onInputBlur}
                        disabled={disabled}
                    />
                </Box>
            </StateContainer>
        </Box>
    );
};

const StreetContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
    '& > div:first-of-type': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            marginRight: theme.spacing(2),
            width: `calc(50% - ${theme.spacing(1)})`,
        },
    },
    '& > div:last-of-type': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(2),
            width: `calc(50% - ${theme.spacing(1)})`,
        },
    },
}));

const StateContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },

    '& .state-zip': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 0,
        '& > *': {
            flex: 1,
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingLeft: theme.spacing(2),
            '& > *': {
                marginRight: theme.spacing(4),
                '&:last-of-type': {
                    marginRight: 0,
                },
            },
        },
    },
    '& > *': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: `calc(50% - ${theme.spacing(1)})`,
            '&:first-of-type': {
                marginRight: theme.spacing(1),
            },
            '&:last-of-type': {
                marginLeft: theme.spacing(1),
            },
        },
    },
}));
