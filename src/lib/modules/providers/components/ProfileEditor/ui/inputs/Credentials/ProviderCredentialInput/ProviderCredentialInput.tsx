import {
    ProviderCredential,
    Country,
    UNITED_STATES,
    CANADA,
} from '@/lib/shared/types';
import { Box } from '@mui/material';
import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { asSelectOptions } from '@/lib/shared/utils';
import {
    Button,
    Caption,
    CAPTION_SIZE,
    FormSectionTitle,
} from '@/lib/shared/components/ui';
import {
    LicenseNumberInput,
    LicenseTypeInput,
    StateInput,
    ExpirationDateInput,
    CountryInput,
} from './inputs';

interface ProviderCredentialInputProps {
    defaultValues?: Partial<ProviderCredential.ProviderCredential>;
    onSubmit: (value: ProviderCredential.ProviderCredential) => void;
    errorMessage?: string;
    successMessage?: string;
    helperText?: string;
    label?: string;
    buttonText?: string;
    sx?: SxProps<Theme>;
}

export const ProviderCredentialInput = ({
    defaultValues,
    label,
    onSubmit,
    buttonText = 'Add credential',
    errorMessage,
    helperText,
    successMessage,
    sx,
}: ProviderCredentialInputProps) => {
    const theme = useTheme();
    const errorColor = errorMessage ? theme.palette.error.main : undefined;
    const successColor = successMessage
        ? theme.palette.success.main
        : undefined;

    const credential = useForm<ProviderCredential.ProviderCredential>({
        mode: 'onChange',
        defaultValues,
    });
    const country = credential.watch('country');

    return (
        <InputWrapper sx={sx}>
            {label && <FormSectionTitle>{label}</FormSectionTitle>}
            <TwoInputContainer>
                <LicenseTypeInput control={credential.control} />
                <LicenseNumberInput control={credential.control} />
            </TwoInputContainer>
            <TwoInputContainer>
                <ExpirationDateInput control={credential.control} />
                <StateInput control={credential.control} country={country} />
                <CountryInput control={credential.control} />
            </TwoInputContainer>
            <Button
                disabled={!credential.formState.isValid}
                fullWidth
                onClick={() => onSubmit(credential.getValues())}
            >
                {buttonText}
            </Button>
            {(errorMessage || successMessage || helperText) && (
                <Caption
                    size={CAPTION_SIZE.SMALL}
                    style={{
                        marginTop: theme.spacing(3),
                        color:
                            errorColor ??
                            successColor ??
                            theme.palette.grey[500],
                    }}
                >
                    {errorMessage ?? successMessage ?? helperText}
                </Caption>
            )}
        </InputWrapper>
    );
};
const InputWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    flexWrap: 'wrap',
}));

const TwoInputContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& > div': {
        flex: 1,
        marginBottom: theme.spacing(4),
    },
}));
