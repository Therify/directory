import { Controller, Control } from 'react-hook-form';
import { Link, useTheme } from '@mui/material';
import { Caption, Toggle } from '@/components/ui';
import { RegisterProvider } from '@/lib/features/registration';
import { TEST_IDS } from './testIds';

interface TermsAndConditionsInputProps {
    control: Control<RegisterProvider.Input['providerDetails']>;
}

export const TermsAndConditionsInput = ({
    control,
}: TermsAndConditionsInputProps) => {
    const theme = useTheme();
    return (
        <Controller
            control={control}
            name="hasAcceptedTermsAndConditions"
            defaultValue={false}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, value, name } }) => (
                <Toggle
                    checked={value}
                    id={name}
                    data-testid={TEST_IDS.TERMS_AGREEMENT}
                    displayText={
                        <Caption style={{ margin: 0 }}>
                            I agree to Therify{"'"}s{' '}
                            <Link
                                href="https://therify.co/terms"
                                target="_blank"
                            >
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="https://therify.co/privacy"
                                target="_blank"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </Caption>
                    }
                    style={{
                        marginBottom: theme.spacing(4),
                    }}
                    {...{ onChange, value, name }}
                />
            )}
        />
    );
};
