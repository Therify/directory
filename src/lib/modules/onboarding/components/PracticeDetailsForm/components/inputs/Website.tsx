import { Control, Controller } from 'react-hook-form';
import { FormValidation, Input } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

interface WebsiteInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const WebsiteInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
}: WebsiteInputProps) => (
    <Controller
        control={control}
        name="website"
        defaultValue={defaultValue}
        rules={{
            validate: {
                [FormValidation.Url.URLValidationType.ValidUrl]: (value) => {
                    const shouldValidate = Boolean(value);
                    return shouldValidate
                        ? FormValidation.Url.isValidUrl(value ?? '')
                        : true;
                },
            },
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                id="website"
                label="Website"
                autoComplete="nope"
                errorMessage={
                    isTouched
                        ? FormValidation.Url.getUrlValidationErrorMessage(
                              error?.type as FormValidation.Url.URLValidationType,
                              'Website'
                          )
                        : undefined
                }
                onBlur={() => {
                    onBlur();
                    onInputBlur();
                }}
                {...{
                    onChange,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
