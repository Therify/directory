import RadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup';
import Radio, { type RadioProps } from '@mui/material/Radio';
import FormControlLabel, {
    type FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import {
    type FieldValues,
    type FieldError,
    useController,
} from 'react-hook-form';
import { type Merge, UseControllerProps } from 'react-hook-form/dist/types';
import { Paragraph } from '../../../Typography/Paragraph';
import { Caption } from '../../../Typography/Miscellaneous/Caption';

declare type $ElementProps<T> = T extends React.ComponentType<infer Props>
    ? Props extends object
        ? Props
        : never
    : never;

type YesNoProps<TForm extends FieldValues> = {
    controllerProps: UseControllerProps<TForm>;
    label: string;
    labelProps?: $ElementProps<typeof Paragraph>;
    error?: Merge<FieldError, (FieldError | undefined)[]>;
    defaultValue?: boolean;
};

export function YesNo<TForm extends FieldValues>({
    controllerProps,
    label,
    labelProps,
    error,
    defaultValue,
}: YesNoProps<TForm>) {
    const { field } = useController(controllerProps);
    return (
        <>
            <Paragraph {...labelProps}>{label}</Paragraph>
            <RadioGroup
                onChange={(event) => {
                    field.onChange(event.target.value === 'yes');
                }}
                value={field.value ? 'yes' : 'no'}
                defaultValue={defaultValue ? 'yes' : 'no'}
                defaultChecked
                sx={{ flexDirection: 'row' }}
            >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            {error && <Caption color="error">{error.message}</Caption>}
        </>
    );
}
