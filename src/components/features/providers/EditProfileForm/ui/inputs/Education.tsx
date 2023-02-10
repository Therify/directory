import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface EducationInputProps {
    // TODO: remove once added. This just make typescript happy
    control: Control<ProviderProfile & { education: string }>;
    disabled?: boolean;
}

export const EducationInput = ({ control, disabled }: EducationInputProps) => (
    <Controller
        control={control}
        name="education"
        defaultValue=""
        // rules={{
        //     required: true,
        // }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                id="education"
                label="Education"
                // errorMessage={
                //     isTouched
                //         ? FormValidation.getNameValidationErrorMessage(
                //               error?.type as FormValidation.NameValidationType,
                //               'First Name'
                //           )
                //         : undefined
                // }
                {...{
                    disabled,
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
