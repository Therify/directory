import { Input, InputProps } from '../Input';

export const Textarea = ({
    rows,
    minRows,
    maxRows,
    ...inputProps
}: InputProps) => (
    <Input
        multiline
        {...(rows !== undefined
            ? { rows }
            : {
                  minRows: minRows ?? 4,
                  maxRows: maxRows ?? 8,
              })}
        {...inputProps}
    />
);
