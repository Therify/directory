import { Controller, Control } from 'react-hook-form';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Caption, Toggle } from '@/lib/shared/components/ui';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';

interface TermsAndConditionsInputProps {
    control: Control<RegisterAccountOwner.Input>;
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
