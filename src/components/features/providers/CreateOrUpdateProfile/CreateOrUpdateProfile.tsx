import { Input, Select, Textarea } from '@/components/ui/FormElements';
import { H1 } from '@/components/ui/Typography';
import { AreaOfFocus, InsuranceProvider, Pronoun, State } from '@/lib/types';
import { asSelectOptions } from '@/lib/utils';
import { Divider, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { TwoColumnGrid } from '../../../ui/Grids/TwoColumnGrid';
import { ProviderProfile } from '../../directory/ProviderProfile';

const EditorContainer = styled(Box)(({ theme }) => ({
    background: theme.palette.background.default,
    padding: theme.spacing(4),
    width: '100%',
    height: '100%',
    overflow: 'auto',
}));

const EditorForm = styled('form')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
}));

const PRONOUNS_OPTIONS = asSelectOptions(Pronoun.ENTRIES);
const STATE_OPTIONS = asSelectOptions(State.ENTRIES);

export function CreateOrUpdateProfile() {
    const [givenName, setGivenName] = useState('John');
    const [surname, setSurname] = useState('Smith');
    const [bio, setBio] = useState('');
    const [acceptedInsurances, setAcceptedInsurances] = useState<
        InsuranceProvider.InsuranceProvider[]
    >([]);
    const [specialties, setSpecialties] = useState<AreaOfFocus.AreaOfFocus[]>(
        []
    );
    const [pronouns, setPronouns] = useState<Pronoun.Pronoun>(
        Pronoun.MAP.THEY_THEM
    );
    const [state, setState] = useState<State.State>(State.MAP.NEW_YORK);
    return (
        <TwoColumnGrid
            leftSlot={
                <EditorContainer>
                    <EditorForm>
                        <H1>Edit Profile</H1>
                        <Divider sx={{ mb: 4 }} />
                        <Input
                            label="First Name"
                            value={givenName}
                            onChange={(e) => setGivenName(e.target.value)}
                        />
                        <Input
                            label="Last Name"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <Select
                            id="pronouns"
                            label="Pronouns"
                            options={PRONOUNS_OPTIONS}
                            value={pronouns as Pronoun.Pronoun}
                            fullWidth
                            onChange={(value) =>
                                setPronouns(value as Pronoun.Pronoun)
                            }
                        />
                        <Select
                            id="state"
                            label="State"
                            options={STATE_OPTIONS}
                            value={state as State.State}
                            fullWidth
                            onChange={(value) => setState(value as State.State)}
                        />
                        <Autocomplete
                            multiple
                            value={
                                acceptedInsurances as InsuranceProvider.InsuranceProvider[]
                            }
                            onChange={(event, newValue) => {
                                setAcceptedInsurances(newValue);
                            }}
                            options={InsuranceProvider.ENTRIES}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Accepted Insurances"
                                />
                            )}
                        />
                        <Autocomplete
                            multiple
                            value={specialties as AreaOfFocus.AreaOfFocus[]}
                            onChange={(event, newValue) => {
                                setSpecialties(newValue);
                            }}
                            options={AreaOfFocus.ENTRIES}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Your Specialties"
                                />
                            )}
                        />
                        <Textarea
                            label="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </EditorForm>
                </EditorContainer>
            }
            rightSlot={
                <ProviderProfile
                    givenName={givenName}
                    surname={surname}
                    pronouns={pronouns}
                    state={state}
                    acceptedInsurances={acceptedInsurances}
                    specialties={specialties}
                    bio={bio}
                />
            }
        />
    );
}
