import InputMask, { Props } from 'react-input-mask';
import { InputProps, StyledInput } from '../Input';
import { InputWrapper } from '../InputWrapper';

interface MaskedInputProps extends InputProps {
    mask: Props['mask'];
    maskPlaceholder?: Props['maskPlaceholder'];
    alwaysShowMask?: Props['alwaysShowMask'];
    beforeMaskedStateChange?: Props['beforeMaskedStateChange'];
}

export const MaskedInput = ({
    mask,
    maskPlaceholder,
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
                maskPlaceholder={maskPlaceholder}
                alwaysShowMask={alwaysShowMask}
                beforeMaskedStateChange={beforeMaskedStateChange}
                {...{ onChange, onInput, onBlur }}
            >
                <StyledInput
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
