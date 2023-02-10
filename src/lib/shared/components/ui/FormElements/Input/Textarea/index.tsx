import { Input, InputProps } from '../Input';

export const Textarea = ({
    rows,
    minRows,
    maxRows,
    ...inputProps
}: InputProps) => (
    <Input
        multiline
        sx={{
            whiteSpace: 'pre-line',
        }}
        {...(rows !== undefined
            ? { rows }
            : {
                  minRows: minRows ?? 4,
                  maxRows: maxRows ?? 8,
              })}
        {...inputProps}
    />
);
