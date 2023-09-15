import InputMask, { Props } from 'react-input-mask';
import { InputProps, StyledInput } from '../Input';
import {
    InputWrapper,
    TEST_IDS as INPUT_WRAPPER_TEST_IDS,
} from '../InputWrapper';

interface MaskedInputProps extends InputProps {
    mask: Props['mask'];
    maskPlaceholderCharacter?: Props['maskPlaceholder'];
    alwaysShowMask?: Props['alwaysShowMask'];
    beforeMaskedStateChange?: Props['beforeMaskedStateChange'];
}

export const MaskedInput = ({
    mask,
    maskPlaceholderCharacter,
    alwaysShowMask,
    beforeMaskedStateChange,
    errorMessage,
    successMessage,
    fullWidth,
    variant = 'default',
    placeholder,
    value,
    onChange,
    onInput,
    onBlur,
    disabled,
    autoComplete,
    ...inputProps
}: MaskedInputProps) => {
    const strValue = String(value);
    return (
        <InputWrapper
            {...{
                errorMessage,
                successMessage,
                variant,
                fullWidth,
                ...inputProps,
            }}
        >
            <InputMask
                mask={mask}
                maskPlaceholder={maskPlaceholderCharacter ?? null}
                alwaysShowMask={alwaysShowMask}
                beforeMaskedStateChange={beforeMaskedStateChange}
                value={strValue}
                {...{
                    onChange,
                    onInput,
                    onBlur,
                    autoComplete,
                    disabled,
                }}
            >
                <StyledInput
                    data-testid={INPUT_WRAPPER_TEST_IDS.INPUT}
                    disabled={disabled}
                    placeholder={placeholder}
                    fullWidth={fullWidth}
                    isSuccess={!!successMessage}
                    isError={!!errorMessage}
                    whiteBg={variant === 'white'}
                    disableUnderline
                />
            </InputMask>
        </InputWrapper>
    );
};
