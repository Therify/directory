import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { Country } from '@/lib/shared/types';

interface ZipCodeInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
    country: HandlePracticeOnboarding.Input['country'];
}

export const ZipCodeInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
    country,
}: ZipCodeInputProps) => {
    const zipLength = getZipLength(country);
    return (
        <Controller
            control={control}
            name="zip"
            defaultValue={defaultValue}
            rules={{
                required: true,
                minLength: {
                    value: zipLength,
                    message: `Zip Code must be ${zipLength} characters`,
                },
                maxLength: {
                    value: zipLength,
                    message: `Zip Code must be ${zipLength} characters`,
                },
            }}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error, isTouched },
            }) => (
                <Input
                    required
                    id="zip-code"
                    placeholder="Zip Code *"
                    type="tel"
                    errorMessage={
                        isTouched
                            ? error?.message ??
                              FormValidation.getNameValidationErrorMessage(
                                  error?.type as FormValidation.NameValidationType,
                                  'Zip Code'
                              )
                            : undefined
                    }
                    onBlur={() => {
                        onBlur();
                        onInputBlur();
                    }}
                    {...{
                        disabled,
                        onChange,
                        value,
                        name,
                    }}
                />
            )}
        />
    );
};

const getZipLength = (country: HandlePracticeOnboarding.Input['country']) => {
    switch (country) {
        case Country.MAP.UNITED_STATES:
            return 5;
        case Country.MAP.CANADA:
            return 6;
        default:
            return 5;
    }
};
