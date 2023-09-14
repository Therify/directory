import { ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from './types';
import { InputField, PasswordField, TextAreaField, SelectField } from './ui';

interface GetFormInputProps<T extends FieldValues> {
    field: FormField<T>;
    useFormProps: UseFormReturn<T, any>;
    isLoading: boolean;
}

export function getFormInput<T extends FieldValues>({
    isLoading,
    field,
    useFormProps,
}: GetFormInputProps<T>): ReactNode {
    switch (field.type) {
        case 'input':
            return <InputField {...{ field, isLoading, ...useFormProps }} />;
        case 'password':
            return <PasswordField {...{ field, isLoading, ...useFormProps }} />;
        case 'textarea':
            return <TextAreaField {...{ field, isLoading, ...useFormProps }} />;
        case 'select':
            return <SelectField {...{ field, isLoading, ...useFormProps }} />;
        default:
            return null;
    }
}
