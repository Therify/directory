import {
    FormSectionSubtitle,
    Button,
    IconButton,
    BUTTON_SIZE,
    BUTTON_TYPE,
    Paragraph,
    Caption,
    Modal,
    CenteredContainer,
    Divider,
} from '@/lib/shared/components/ui';
import { Control, Controller } from 'react-hook-form';
import {
    ProviderCredential,
    ProviderProfile,
    UNITED_STATES,
} from '@/lib/shared/types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { format } from 'date-fns';
import {
    DeleteRounded,
    LocalPoliceRounded,
    AddRounded,
} from '@mui/icons-material';
import { ProviderCredentialInput } from './ProviderCredentialInput';

interface InputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const CredentialsManagerInput = ({ control, disabled }: InputProps) => {
    const [showEditor, setShowEditor] = useState(false);
    const [credentialToDelete, setCredentialToDelete] =
        useState<ProviderCredential.ProviderCredential>();

    return (
        <Controller
            control={control}
            name="credentials"
            render={({ field: { onChange, value, name } }) => (
                <Box marginBottom={6}>
                    <FormSectionSubtitle>Licenses</FormSectionSubtitle>
                    {value.length === 0 && (
                        <Caption>No licenses to show.</Caption>
                    )}
                    {value.map((credential) => (
                        <Credential
                            disabled={disabled}
                            key={credential.licenseNumber}
                            credential={credential}
                            onDelete={() => {
                                setCredentialToDelete(credential);
                            }}
                        />
                    ))}
                    {showEditor && (
                        <Modal
                            onClose={() => setShowEditor(false)}
                            isOpen
                            title="New License"
                            postBodySlot={
                                <ProviderCredentialInput
                                    defaultValues={{
                                        country: UNITED_STATES.COUNTRY.CODE,
                                    }}
                                    onSubmit={(credential) => {
                                        onChange([...value, credential]);
                                        setShowEditor(false);
                                    }}
                                />
                            }
                        />
                    )}
                    {credentialToDelete && (
                        <Modal
                            title="Are you sure you want to delete this license?"
                            fullWidthButtons
                            postBodySlot={
                                <Box>
                                    <Divider style={{ marginTop: 0 }} />
                                    <Paragraph>
                                        <b>State:</b> {credentialToDelete.state}
                                    </Paragraph>
                                    <Paragraph>
                                        <b>Type:</b> {credentialToDelete.type}
                                    </Paragraph>
                                    <Paragraph>
                                        <b>License Number:</b>{' '}
                                        {credentialToDelete.licenseNumber}
                                    </Paragraph>
                                    <Paragraph>
                                        <b>Expires:</b>{' '}
                                        {format(
                                            new Date(
                                                credentialToDelete.expirationDate
                                            ),
                                            'MM/dd/yyyy'
                                        )}
                                    </Paragraph>
                                    <Divider />
                                    {value.filter(
                                        ({ state }) =>
                                            state === credentialToDelete.state
                                    ).length === 1 && (
                                        <Caption>
                                            This will also delete any accepted
                                            insurances associated with{' '}
                                            {credentialToDelete.state}.
                                        </Caption>
                                    )}
                                </Box>
                            }
                            onClose={() => setCredentialToDelete(undefined)}
                            isOpen
                            primaryButtonOnClick={() => {
                                onChange(
                                    value.filter(
                                        (credential) =>
                                            credential.licenseNumber !==
                                            credentialToDelete.licenseNumber
                                    )
                                );
                                setCredentialToDelete(undefined);
                            }}
                            primaryButtonText="Delete"
                            secondaryButtonOnClick={() =>
                                setCredentialToDelete(undefined)
                            }
                            secondaryButtonText="Cancel"
                        />
                    )}

                    <Button
                        onClick={() => setShowEditor(true)}
                        disabled={disabled}
                        startIcon={<AddRounded />}
                    >
                        Add License
                    </Button>
                </Box>
            )}
        />
    );
};

const Credential = ({
    credential,
    onDelete,
    disabled,
}: {
    credential: ProviderCredential.ProviderCredential;
    onDelete: () => void;
    disabled?: boolean;
}) => {
    return (
        <CredentialWrapper>
            <Box display="flex" flex={1} alignItems="center">
                <CenteredContainer paddingY={2} paddingX={4}>
                    <LocalPoliceRounded />
                </CenteredContainer>
                <Box>
                    <Paragraph noMargin bold>
                        {credential.type}
                    </Paragraph>
                    <CredentialDetails>
                        {credential.state}, {credential.country} -{' '}
                        {credential.licenseNumber} - Exp:{' '}
                        {format(
                            new Date(credential.expirationDate),
                            'MM/dd/yyyy'
                        )}
                    </CredentialDetails>
                </Box>
            </Box>
            <IconButton
                disabled={disabled}
                size={BUTTON_SIZE.SMALL}
                type={BUTTON_TYPE.TEXT}
                color="info"
                onClick={onDelete}
            >
                <DeleteRounded />
            </IconButton>
        </CredentialWrapper>
    );
};

const CredentialWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    // backgroundColor: theme.palette.secondary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:last-of-type': {
        marginBottom: theme.spacing(4),
    },
}));

const CredentialDetails = styled(Caption)(({ theme }) => ({
    color: theme.palette.info.main,
    marginBottom: theme.spacing(1),
}));
