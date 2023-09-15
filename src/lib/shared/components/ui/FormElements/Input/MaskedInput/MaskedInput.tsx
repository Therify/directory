import InputMask, { Props } from 'react-input-mask';
import { InputProps, StyledInput } from '../Input';
import { InputWrapper } from '../InputWrapper';

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
    onChange,
    onInput,
    onBlur,
    disabled,
    autoComplete,
    ...inputProps
}: MaskedInputProps) => {
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
                {...{ onChange, onInput, onBlur, autoComplete, disabled }}
            >
                <StyledInput
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
