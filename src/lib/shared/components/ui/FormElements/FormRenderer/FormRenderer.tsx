import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { ReportProblemRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { DeepPartial, useForm } from 'react-hook-form';
import { ALERT_TYPE, Alert } from '../../Alert';
import { Button } from '../../Button';
import { CenteredContainer } from '../../Containers';
import { H1, H2 } from '../../Typography/Headers';
import { getFormInput } from './getFormInput';
import { FormConfig } from './types';

export const TEST_IDS = {
    SUBMIT_BUTTON: 'submit-button',
} as const;

export function FormRenderer<ValidationSchema extends z.ZodTypeAny>({
    config,
    defaultValues,
    validationMode = 'onChange',
    title,
    subTitle,
    submitButtonText = 'Submit',
    backButtonText = 'Back',
    onSubmit,
    validationSchema,
    errorMessage,
    clearErrorMessage,
    onBack,
    isSubmitting,
    isBackButtonDisabled,
    sx,
}: {
    title: ReactNode;
    subTitle?: ReactNode;
    validationSchema: ValidationSchema;
    config: FormConfig<z.infer<ValidationSchema>>;
    defaultValues?: DeepPartial<z.infer<ValidationSchema>>;
    submitButtonText?: string;
    backButtonText?: string;
    isBackButtonDisabled?: boolean;
    isSubmitting?: boolean;
    errorMessage?: string;
    clearErrorMessage?: () => void;
    validationMode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
    onBack?: () => void;
    onSubmit: (data: ValidationSchema) => void;
    sx?: SxProps<Theme>;
}) {
    const form = useForm<z.infer<ValidationSchema>>({
        mode: 'onChange' ?? validationMode,
        ...(defaultValues && { defaultValues }),
        resolver: zodResolver(validationSchema),
    });

    const {
        watch,
        formState: { isValid },
        handleSubmit,
    } = form;
    // There is a problem where this watch call is needed to trigger validation
    watch();
    return (
        <Form sx={sx}>
            <FormContent isError={!!errorMessage}>
                <Header>{title}</Header>
                {subTitle && <p>{subTitle}</p>}

                {config.sections.map((formSection, i) => (
                    <FormSection key={`section-${i}`}>
                        {formSection.title && (
                            <Box width="100%">
                                {typeof formSection.title === 'string' ? (
                                    <SectionTitle>
                                        {formSection.title}
                                    </SectionTitle>
                                ) : (
                                    formSection.title
                                )}
                            </Box>
                        )}
                        {formSection.fields.map((field, i) => {
                            return (
                                <FieldContainer
                                    className={
                                        field.fullWidth
                                            ? undefined
                                            : 'collapsed'
                                    }
                                    fullWidth={field.fullWidth}
                                    key={`field-${i}`}
                                >
                                    {getFormInput({
                                        field,
                                        useFormProps: form,
                                    })}
                                </FieldContainer>
                            );
                        })}
                    </FormSection>
                ))}
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Alert
                            icon={
                                <CenteredContainer>
                                    <ReportProblemRounded />
                                </CenteredContainer>
                            }
                            type={ALERT_TYPE.ERROR}
                            title={errorMessage}
                            onClose={clearErrorMessage}
                        />
                    </motion.div>
                )}
            </FormContent>
            <ButtonContainer>
                {onBack && (
                    <Button
                        type="outlined"
                        disabled={isBackButtonDisabled || isSubmitting}
                        onClick={onBack}
                    >
                        {backButtonText}
                    </Button>
                )}
                <Button
                    data-testid={TEST_IDS.SUBMIT_BUTTON}
                    disabled={!isValid || isSubmitting}
                    isLoading={isSubmitting}
                    onClick={handleSubmit((values) => onSubmit(values))}
                >
                    {submitButtonText}
                </Button>
            </ButtonContainer>
        </Form>
    );
}

const Form = styled('form')(({ theme }) => ({
    width: '100%',
}));

const FormContent = styled('div', {
    shouldForwardProp: (prop) => 'isError' !== prop,
})<{ isError: boolean }>(({ theme, isError }) => ({
    width: '100%',
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6.5, 8),
    ...(isError && {
        paddingBottom: theme.spacing(4),
        border: `2px solid ${theme.palette.error.main}`,
    }),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(30),
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(10),
        ...(isError && {
            paddingBottom: theme.spacing(15),
        }),
    },
}));

const ButtonContainer = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(8, 0),

    '& button': {
        width: `calc(50% - ${theme.spacing(4)})`,
        '&:first-of-type': {
            marginRight: theme.spacing(4),
            marginLeft: '0 !important',
        },
        '&:last-of-type': {
            marginRight: '0 !important',
            marginLeft: theme.spacing(4),
            display: 'flex',
            justifySelf: 'flex-end',
        },
    },
}));

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
}));

const SectionTitle = styled(H2)(({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: 600,
}));

const FormSection = styled('section')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(15),
    '& > *': {
        marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}));

const FieldContainer = styled(Box, {
    shouldForwardProp: (prop) => 'fullWidth' !== prop,
})<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
    width: '100%',
    display: 'inline-block',
    [theme.breakpoints.up('md')]: {
        width: fullWidth ? '100%' : `calc(50% - ${theme.spacing(2)})`,
        '&:nth-of-type(odd).collapsed': {
            marginLeft: theme.spacing(4),
        },
    },
}));
